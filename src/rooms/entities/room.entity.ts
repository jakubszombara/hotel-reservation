import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomType } from '../enums/type.enum';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  roomNumber: string;

  @Column()
  capacity: number;

  @Column({ type: 'enum', enum: RoomType })
  type: string;
}
/*
Poczytaj co daje sie w srodku () od @Column
*/
