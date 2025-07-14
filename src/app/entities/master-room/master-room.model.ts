
export interface Room {
    id: number;
    name: string;
    capacity: number;
    description: string;
    status: 'READY' | 'BOOKED' | 'NOT_READY';
  }


export class RoomPageDto {
    constructor(
        public totalRow?: number,
        public page?: number,
        public count?: number,
        public content?: Room[],
        public error?: string,
        public first?: boolean,
        public last?: boolean,
    ) {}
}