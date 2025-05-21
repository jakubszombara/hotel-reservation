import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import { GuestModule } from './guests/guests.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'hotel',
      autoLoadEntities: true,
      synchronize: false,
    }),
    RoomsModule,
    GuestModule,
    ReservationsModule,
  ],
})
export class AppModule {}
