import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservation } from "./entities/reservation.entity";
import { ReservationService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Reservation])],
    controllers: [ReservationsController],
    providers: [ReservationService]
})
export class ReservationsModule {}