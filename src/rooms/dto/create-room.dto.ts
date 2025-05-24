import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoomType } from '../enums/type.enum';

export class CreateRoomRequest {
  @IsString()
  @IsNotEmpty()
  public roomNumber: string;

  @IsNumber()
  @IsNotEmpty()
  public capacity: number;

  @IsEnum(RoomType)
  @IsNotEmpty()
  public type: RoomType;
}

export class CreateRoomResponse {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public roomNumber: string;

  @IsNumber()
  @IsNotEmpty()
  public capacity: number;

  @IsEnum(RoomType)
  @IsNotEmpty()
  public type: RoomType;
}

// popatrz sobie co sie dzieje kiedy masz te @IsSting() a kiedy tego nie masz
