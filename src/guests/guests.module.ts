import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Guest } from "./entities/guest.entity";
import { GuestsController } from "./guests.controller";
import { GuestService } from "./guests.service";

@Module({
    imports: [TypeOrmModule.forFeature([Guest])],
    controllers: [GuestsController],
    providers: [GuestService]
})
export class GuestModule{}