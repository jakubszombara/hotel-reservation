import { Reservation } from 'src/reservations/entities/reservation.entity';
import {Entity , PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity() 
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    capacity: number;

    @Column()
    type: string;

    @OneToMany(() => Reservation, reservation => reservation.room)
    reservations:Reservation[];
}