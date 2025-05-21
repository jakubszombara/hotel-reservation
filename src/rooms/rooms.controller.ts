import { RoomsService } from "./rooms.service";
import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { Room } from "./entities/room.entity";

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Get()
    findAll(
        @Query('type')type?: string,
        @Query('availableFrom')availableFrom?: string,
        @Query('availableTo')availableTo?: string,
    ): Promise<Room[]> {
        return this.roomsService.findFiltered(type, availableFrom, availableTo);
    }

    @Post()
    create(@Body() roomData: Partial<Room>): Promise<Room> {
        return this.roomsService.create(roomData);
    }
}