import { User } from "src/app/theme/shared/components/_helpers/user";
import { Room } from "../master-room/master-room.model";

export interface Sewa {
    id : number,
    customerName : String,
    startTime : Date,
    endTime : Date,
    phoneNumber : String,
    numberOfParticipants : number,
    eventName : String,
    notes : String,
    user: User,
    room: Room,
    userName: String,
    roomId: number,
    startTimeString : String,
    endTimeString : String,
  }


export class SewaPageDto {
    constructor(
        public totalElements?: number,
        public page?: number,
        public size?: number,
        public content?: Sewa[],
        public totalPages?: number,
        public last?: boolean,
        public first?: boolean,
    ) {}
}