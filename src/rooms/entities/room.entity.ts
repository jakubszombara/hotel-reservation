import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  number: string;

  @Column()
  capacity: number;

  @Column()
  type: string;
}
/*
Poczytaj co daje sie w srodku () od @Column
*/
