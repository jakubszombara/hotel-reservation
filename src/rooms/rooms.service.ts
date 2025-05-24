import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomRequest, CreateRoomResponse } from './dto/create-room.dto';
import { Pagination} from './dto/pagination.dto';
import { RoomFilter } from './dto/roomFilter.dto';
import { PaginatedResponse } from './interfaces/paginatedResponse';
import { createPagination } from './utils/pagination.utils';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class RoomsService {
  public constructor(
    @InjectRepository(Room)
    private roomsRespository: Repository<Room>,
  ) {}

  public async findAll(pagination: Pagination): Promise<PaginatedResponse<Room>> {
    const [items, total] = await this.roomsRespository.findAndCount({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });

    return createPagination(items, total, pagination.page, pagination.limit);
  }

  public async create(roomData: CreateRoomRequest): Promise<CreateRoomResponse> {
    const room = this.roomsRespository.create({
      roomNumber: roomData.roomNumber,
      capacity: roomData.capacity,
      type: roomData.type,
    });

    const savedRoom = await this.roomsRespository.save(room);

    return plainToInstance(CreateRoomResponse, savedRoom);
    
  }

  public async findFiltered(
    filter: RoomFilter,
    pagination: Pagination,
  ): Promise<PaginatedResponse<Room>> {
    const query = this.roomsRespository.createQueryBuilder('room');

    if (filter.type) {
      query.andWhere('room.type = :type', { type: filter.type });
    }

    if (filter.availableFrom && filter.availableTo) {
      query.leftJoin('room.reservations', 'reservation').andWhere(
        `(reservation.id IS NULL OR 
                reservation.dateTo < :availableFrom OR
                reservation.dateFrom > :availableTo
                )`,
        {
          availableFrom: filter.availableFrom,
          availableTo: filter.availableTo,
        },
      );
    }

    const total = await query.getCount();
    
    query
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit);

    const items = await query.getMany();
    
    return createPagination(items, total, pagination.page, pagination.limit);
  }

  public async findRoomById(id: number): Promise<Room> {
    const room = await this.roomsRespository.findOne({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found!`);
    }

    return room;
  }

  public async deleteRoom(id: number): Promise<void> {
    const result = await this.roomsRespository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Room with ID ${id} not found!`);
    }
  }
}
