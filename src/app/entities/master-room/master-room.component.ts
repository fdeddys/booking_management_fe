import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Room } from './master-room.model';
import { MasterRoomService } from './master-room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/share/icon.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-master-room',
  templateUrl: './master-room.component.html',
  imports: [FormsModule, CommonModule, IconComponent],
  styleUrls: ['./master-room.component.scss']
})
export class MasterRoomComponent implements OnInit {
  

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

  constructor(
    private roomService : MasterRoomService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    console.log("room load all..")
    this.loadAll();
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


  loadDetailPage(roomId: number) {
    this.roomService.setSelectedRoomId(roomId)
    this.router.navigate(['/room-detail'])
  }

  addnew() {
    this.roomService.setSelectedRoomId(0)
    this.router.navigate(['/room-detail'])
  }

}
