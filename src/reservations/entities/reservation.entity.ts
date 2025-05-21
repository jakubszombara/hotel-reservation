import { Guest } from "src/guests/entities/guest.entity";
import { Room } from "src/rooms/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Guest)
    guest: Guest;

    @ManyToOne(() => Room)
    room: Room;

    @Column()
    dateFrom: string;

    @Column()
    dateTo: string;
}