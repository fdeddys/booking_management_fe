import { Component, effect, OnInit } from '@angular/core';
import { Room } from '../master-room.model';
import Swal from 'sweetalert2';
import { IconComponent } from 'src/app/share/icon.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterRoomService } from '../master-room.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-master-room-edit',
  imports: [FormsModule, CommonModule, IconComponent],
  templateUrl: './master-room-edit.component.html',
  styleUrl: './master-room-edit.component.scss'
})
export class MasterRoomEditComponent implements OnInit {

  selectedRoom: Room = this.getEmptyRoom();

  constructor(
    private roomService : MasterRoomService,
    private router: Router,
  ) {
    effect(()=>{
      const selectedId = this.roomService.selectedRoomId(); 
      console.log("room detail all.." + selectedId)
      if (selectedId) {
        this.roomService.getRoomById(selectedId).subscribe({
          next: (room) => {
            this.selectedRoom = room

          },
          error: (error) => {
            console.log("Error get by id : ", selectedId)
          }
        })
      } else {
        this.newRoom();
      }
    })
  }
  
  ngOnInit() {
    
  
   
  }

  newRoom() {
    this.selectedRoom = this.getEmptyRoom();
  }

  getEmptyRoom(): Room {
    return {
      id: 0,
      name: '',
      description: '',
      status: 'READY'
    };
  }

  updateRoom() {
    if (!this.selectedRoom.name) return;

    if (this.selectedRoom.id ===0) {
      this.roomService.createRoom(this.selectedRoom).subscribe({
        next: (response) => {
          if (response?.errorCode === '0000') {
            Swal.fire('Berhasil', 'Data ruangan berhasil di buat', 'success')
            this.selectedRoom = response?.object
          } else {
            Swal.fire('Gagal', response?.errorDescription, 'error')
          }
        },
        error: (error) => {
          console.log('Gagal insert ke server : ', error.message)
          Swal.fire('Gagal', error.message, 'error')
        }
      })
      Swal.fire('Berhasil', 'Data ruangan ditambahkan', 'success');
    } else {
      this.roomService.updateRoom(this.selectedRoom).subscribe({
        next: (respose) =>{
          if (respose?.errorCode === '0000') {
            Swal.fire('Berhasil', 'Data ruangan di update', 'success');
            this.selectedRoom = respose?.object
          } else {
            Swal.fire('Gagal', respose?.errorDescription, 'error')
          }
        },
        error: (error) => {
          console.error('Gagal update ke server:', error.message);
          Swal.fire('Gagal', error.message, 'error')
        }
      })
     
    }

  }

  backToList(){
    this.router.navigate(['/room'])
  }

}
