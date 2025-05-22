import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import { GuestModule } from './guests/guests.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'hotel',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RoomsModule,
    // GuestModule,
    // ReservationsModule,
  ],
})
export class AppModule {}
