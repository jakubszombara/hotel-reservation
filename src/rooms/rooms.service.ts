import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Room} from "./entities/room.entity"


@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private roomsRespository: Repository<Room>,
    ) {}

    findAll(filter: { type?: string; capacity?: number}): Promise<Room[]> {
        const where: any = {};

        if(filter.type) {
            where.type = filter.type;
        }

        if(filter.capacity) {
            where.capacity = filter.capacity;
        }


        return this.roomsRespository.find({
            where,
            relations: ['reservations'],
        });
    }

    create(roomData: Partial<Room>): Promise<Room> {
        const room = this.roomsRespository.create(roomData);
        return this.roomsRespository.save(room);
    }

    async findFiltered(type?: string, availableFrom?: string, availableTo?: string): Promise <Room[]> {
        const query = this.roomsRespository.createQueryBuilder('room');

        if(type) {
            query.andWhere('room.type = :type', {type});
        }

        if (availableFrom && availableTo) {
            query.leftJoin('room.reservations', 'reservation')
            .andWhere(`(reservation.id IS NULL OR 
                reservation.dateTo < :availableFrom OR
                reservation.dateFrom > :availableTo
                )`, {
                    availableFrom,
                    availableTo,
                });
        }

        return query.getMany();
    }
}