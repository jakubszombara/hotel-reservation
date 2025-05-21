import { Body, Controller, Get, Post } from "@nestjs/common";
import { ReservationService } from "./reservations.service";
import { Reservation } from "./entities/reservation.entity";

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationService) {}

    @Get()
    findAll(): Promise<Reservation[]> {
        return this.reservationsService.findAll();
    }

    @Post()
    create(@Body() reservationData: Partial<Reservation>): Promise <Reservation> {
        return this.reservationsService.create(reservationData);
    }

    @Post('/reserve-room')
    async reserveRoom(@Body() data: any) {
        return this.reservationsService.reserveRoom(data);
    }
}