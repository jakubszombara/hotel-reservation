import { Controller, Get, Post, Body } from "@nestjs/common";
import { GuestService } from "./guests.service";
import { Guest } from "./entities/guest.entity";

@Controller('guests')
export class GuestsController {
    constructor(private readonly guestsService: GuestService) {}


@Get()
findAll(): Promise<Guest[]> {
    return this.guestsService.findAll();
}

@Post()
create(@Body() guestData: Partial<Guest>): Promise<Guest> {
    return this.guestsService.create(guestData);
}
}
// TEST: ten komentarz pochodzi z gałęzi feature/test-branch
