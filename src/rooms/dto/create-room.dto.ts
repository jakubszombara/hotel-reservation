import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoomType } from '../enums/type.enum';

export class CreateRoomRequest {
  @IsString()
  @IsNotEmpty()
  public number: string;

  @IsNumber()
  @IsNotEmpty()
  public capacity: number;

  @IsEnum(RoomType)
  @IsNotEmpty()
  public type: string;
}

export class CreateRoomResponse {
  //
}

// popatrz sobie co sie dzieje kiedy masz te @IsSting() a kiedy tego nie masz
