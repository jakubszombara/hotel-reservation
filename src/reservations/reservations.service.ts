import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
  ) {}

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find({ relations: ['guest', 'room'] });
  }

  create(reservationData: Partial<Reservation>): Promise<Reservation> {
    const reservation = this.reservationsRepository.create(reservationData);
    return this.reservationsRepository.save(reservation);
  }

  async reserveRoom(data: any): Promise<any> {
    const { guest, room, dateFrom, dateTo } = data;

    const overLapping = await this.reservationsRepository.findOne({
      where: {
        room: { id: room.id },
        dateFrom: LessThanOrEqual(dateTo),
        dateTo: MoreThanOrEqual(dateFrom),
      } as any,
      relations: ['room'],
    });

    if (overLapping) {
      throw new BadRequestException('The room is already booked for this date');
    }

    const reservation = this.reservationsRepository.create(data);
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    await this.reservationsRepository.delete(id);
  }
}
