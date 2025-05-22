import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomRequest } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRespository: Repository<Room>,
  ) {}

  findAll(filter: { type?: string; capacity?: number }): Promise<Room[]> {
    const where: any = {};

    if (filter.type) {
      where.type = filter.type;
    }

    if (filter.capacity) {
      where.capacity = filter.capacity;
    }

    return this.roomsRespository.find({
      where,
      relations: ['reservations'],
    });
  }

  async create(roomData: CreateRoomRequest): Promise<Room> {
    console.log(`roomData`, roomData);

    const room = this.roomsRespository.create({
      number: roomData.number,
      capacity: roomData.capacity,
      type: roomData.type,
    });

    const result = await this.roomsRespository.save(room);

    // console.log(`Udalo mi sie stworzyc pokoj o id: ${result[0].id}`);

    return result;
  }

  async findFiltered(
    type?: string,
    availableFrom?: string,
    availableTo?: string,
  ): Promise<Room[]> {
    const query = this.roomsRespository.createQueryBuilder('room');

    if (type) {
      query.andWhere('room.type = :type', { type });
    }

    if (availableFrom && availableTo) {
      query.leftJoin('room.reservations', 'reservation').andWhere(
        `(reservation.id IS NULL OR 
                reservation.dateTo < :availableFrom OR
                reservation.dateFrom > :availableTo
                )`,
        {
          availableFrom,
          availableTo,
        },
      );
    }

    return query.getMany();
  }
}
