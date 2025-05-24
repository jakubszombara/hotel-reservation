import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { RoomType } from "../enums/type.enum";

export class RoomFilter {
    @IsOptional()
    @IsEnum(RoomType)
    type?: RoomType;

    @IsOptional()
    @IsDateString()
    availableFrom?: string;

    @IsOptional()
    @IsDateString()
    availableTo?: string;
    
}