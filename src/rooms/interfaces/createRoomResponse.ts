import { RoomType } from "../enums/type.enum";

export interface CreateRoomResponse {
    id: number;
    roomNumber: string;
    capacity: number;
    type: RoomType;
}

