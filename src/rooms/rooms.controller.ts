import { RoomsService } from './rooms.service';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { CreateRoomRequest } from './dto/create-room.dto';
import { RoomType } from './enums/type.enum';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {
    // setTimeout(async () => {
    //   console.log('start');
    //   const result = await this.create({
    //     number: '101',
    //     capacity: 2,
    //     type: RoomType.DOUBLE,
    //   });
    //   console.log('end', result);
    // }, 3000);
    // lub (sudo) docker compose up (lub z --build)
  }

  @Get()
  findFiltered(
    @Query()
    filter: {
      type?: RoomType;
      availableFrom?: string;
      availableTo?: string;
    },
    @Query() pagination: { page: 1; limit: 20 },
  ): Promise<Room[]> {
    return this.roomsService.findFiltered(filter as any); // +paginacja
  }

  @Post()
  async create(@Body() roomData: CreateRoomRequest): Promise<Room> {
    try {
      return await this.roomsService.create(roomData);
    } catch (error) {
      console.log(`[RoomsController] create: ${error}`);
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
