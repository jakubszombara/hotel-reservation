import { RoomsService } from './rooms.service';
import { Controller, Get, Post, Body, Query, Param, Delete } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { CreateRoomRequest } from './dto/create-room.dto';
import { RoomType } from './enums/type.enum';
import { Pagination } from './dto/pagination.dto';
import { RoomFilter } from './dto/roomFilter.dto';
import { filter } from 'rxjs';
import { PaginatedResponse } from './interfaces/paginatedResponse';  

@Controller('rooms')
export class RoomsController {
  public constructor(private readonly roomsService: RoomsService) {
    // setTimeout(async () => {
    //   console.log('start');
    //   const result = await this.create({
    //     roomNumber: '101',
    //     capacity: 2,
    //     type: RoomType.DOUBLE,
    //   });
    //   console.log('end', result);
    // }, 3000);
    // lub (sudo) docker compose up (lub z --build)
  }

  @Get('filtered')
  public findFiltered(
    @Query() filter: RoomFilter,
    @Query() pagination: Pagination,
  ): Promise<PaginatedResponse<Room>> {
    return this.roomsService.findFiltered(filter, pagination);
  }

  @Get()
  public findAll(@Query() pagination: Pagination): Promise<PaginatedResponse<Room>> {
    return this.roomsService.findAll(pagination);
  }

  @Post()
  public async create(@Body() roomData: CreateRoomRequest): Promise<Room> {
    try {
      return await this.roomsService.create(roomData);
    } catch (error) {
      console.log(`[RoomsController] create: ${error}`);
      throw error;
    }
  }

  @Get(':id')
  public async findRoomById(@Param('id') id: number): Promise<Room> {
    return this.roomsService.findRoomById(id);
  }

  @Delete(':id')
  public async deleteRoom(@Param('id') id: number): Promise<void> {
    try {
      return this.roomsService.deleteRoom(id);
    } catch (error) {
      console.log(`[RoomsController] deleteRoom: ${error}`);
      throw error;
    }
  }
}

/*
zawsze dodawaj public przed constructorami i funkcjami (moze tez byc private)
dodaj EP findAll wszystkich, + paginacja page,limit  
EP do pobrania pokoju po id
EP do usuniecia pokoju
poczytaj o try/catch
*/

/*
git commit -m "feat: add create room endpoint"
git push
*/
