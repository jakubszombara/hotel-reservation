import { Guest } from 'src/guests/entities/guest.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  Entity,
  ForeignKey,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ForeignKey(() => Guest)
  guestId: number;

  @ForeignKey(() => Room)
  roomId: number;

  @Column()
  dateFrom: string;

  @Column()
  dateTo: string;
}

/*
czym jest @ForeignKey? i PrimaryKey?
o co chodzi w join table?
*/
