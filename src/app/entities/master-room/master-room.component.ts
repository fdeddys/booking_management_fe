import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Room } from './master-room.model';
import { MasterRoomService } from './master-room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/share/icon.component';


@Component({
  selector: 'app-master-room',
  templateUrl: './master-room.component.html',
  imports: [FormsModule, CommonModule, IconComponent],
  styleUrls: ['./master-room.component.scss']
})
export class MasterRoomComponent implements OnInit {
  
  activeTab: 'list' | 'detail' = 'list';
  selectedRoom: Room = this.getEmptyRoom();
  page = 1;
  pageSize = 5;
  totalPages = 1;
  totalData = 0;
  searchTerm = {
    name: '',
    description : '',
    status: "READY",
    isActive: true
  }
  firstPage: boolean = true;
  lastpage: boolean = true;
  
  rooms: Room[] = [];

  constructor(private roomService : MasterRoomService) {

  }

  ngOnInit() {
    console.log("room load all..")
    this.loadAll();
  }

  switchTab(tab: 'list' | 'detail') {
    this.activeTab = tab;
  }

  loadAll() {
    this.roomService.filter({
      filter: this.searchTerm,
      page: this.page,
      count: this.pageSize
    }).subscribe({
      next: (response) => {
        console.log("res", response.body);
        this.rooms = response.body?.content ?? [];
        this.firstPage = response.body?.first ?? true;
        this.lastpage = response.body?.last ?? true;
      },
      error: (err) => {
        console.error("Gagal ambil data:", err.message);
      }
    });
  }

  openPage(page: number){
    console.log("open page : " + page)
    this.page += page;
    this.loadAll();
  }

  onError(message: string): void {
    console.log('Error : ', message)
  }

  onSuccess(data: any) {
    console.log("on success")
    if (data.contents.length <0) {
      return;
    }
    this.rooms = data.contents;
    this.totalData = data.totalRow;
  }



  newRoom() {
    this.selectedRoom = this.getEmptyRoom();
  }

  editRoom(room: Room) {
    this.selectedRoom = { ...room };
    this.switchTab('detail');
  }

  updateRoom() {
    if (!this.selectedRoom.name) return;

    if (this.selectedRoom.id) {
      const index = this.rooms.findIndex(r => r.id === this.selectedRoom.id);
      this.rooms[index] = { ...this.selectedRoom };
      Swal.fire('Berhasil', 'Data ruangan diperbarui', 'success');
    } else {
      const newId = Math.max(...this.rooms.map(r => r.id), 0) + 1;
      this.selectedRoom.id = newId;
      this.rooms.push({ ...this.selectedRoom });
      Swal.fire('Berhasil', 'Data ruangan ditambahkan', 'success');
    }

    this.switchTab('list');
  }

  getEmptyRoom(): Room {
    return {
      id: 0,
      name: '',
      description: '',
      status: 'READY'
    };
  }
}
