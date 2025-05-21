import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guest } from "./entities/guest.entity";
import { Repository } from "typeorm";

@Injectable()
export class GuestService {
    constructor(
        @InjectRepository(Guest)
        private guestsRepository: Repository<Guest>,
    ) {}

    findAll(): Promise<Guest[]> {
        return this.guestsRepository.find();
    }

    create(guestData: Partial<Guest>): Promise<Guest> {
        const guest = this.guestsRepository.create(guestData);
        return this.guestsRepository.save(guest);
    }
}