import { Component, OnInit, effect } from '@angular/core';
import { Sewa } from '../sewa.model';
import { User } from 'src/app/theme/shared/components/_helpers/user';
import { Room } from "../../master-room/master-room.model";
import { MasterRoomService } from '../../master-room/master-room.service';
import { Router } from '@angular/router';
import { SewaService } from '../sewa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EMPTY, concatMap, tap } from 'rxjs';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/theme/shared/service';

@Component({
  selector: 'app-sewa-edit',
  imports: [FormsModule, CommonModule, NgbDatepickerModule],
  templateUrl: './sewa-edit.component.html',
  styleUrl: './sewa-edit.component.scss'
})
export class SewaEditComponent {

  selectedSewa: Sewa = this.getEmptySewa();
  allRooms: Room[] = []
  selectedRoom : Room  = this.getEmptyRoom();
  jamOperational: string[] = ['09:00', '10:00', '11:00', '12:00'];
  jamOperationalAkhir: string[] = ['10:00', '11:00', '12:00', '13:00'];

  jamAwal: String = this.jamOperational[0];
  jamAkhir: String = this.jamOperationalAkhir[0];

  tglAwal: NgbDateStruct | null = null;
  
  constructor(
    private roomService: MasterRoomService,
    private router: Router,
    private sewaService: SewaService,
    private authenticationService: AuthenticationService
  ) {
    this.defaultDate()
    effect(()=>{
      const selectedId = this.sewaService.selectedSewaId(); 
      if (selectedId === null) {
        Swal.fire('Error', 'Please klik back button', 'error')

        return;
      }
  
      console.log("Sewa get detail.." + selectedId)

      this.roomService.getAllRoom().pipe(
        tap((rooms) => {
          this.allRooms = rooms;
          console.log('rooms ', rooms)
          this.selectedRoom = rooms[0]
        }),
        concatMap(() => 
          selectedId === null || selectedId === 0 ?  EMPTY : this.sewaService.getSewaById(selectedId)
        ),
        tap((sewa) => {
          this.selectedSewa = sewa
          this.selectedRoom = sewa.room
          
          const tanggal = new Date(sewa.startTime)
          // const year = tanggal.getFullYear();        
          // const month = tanggal.getMonth() + 1;   
          // const day = tanggal.getDate();    
          this.tglAwal = {
            year : tanggal.getFullYear(),
            month : tanggal.getMonth() +1,
            day : tanggal.getDate()
          }    
          // const tgl = (`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`).toString()

          const mulai = new Date(sewa.startTime);
          const jamMulai = mulai.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
          console.log('mulai : ', jamMulai)
          this.jamAwal = jamMulai

          const selesai = new Date(sewa.endTime);
          selesai.setSeconds( selesai.getSeconds() + 1)
          const jamSelesai = selesai.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
          console.log('selesai : ', jamSelesai)
          this.jamAkhir = jamSelesai

          console.log('selected sewa ', sewa)
        })
      ).subscribe()
    })
  }

  // if (selectedId) {
      //   this.sewaService.getSewaById(selectedId).subscribe({
      //     next: (sewa) => {
      //       this.selectedSewa = sewa
      //     },
      //     error: (error) => {
      //       console.log("Error get by id : ", selectedId)
      //     }
      //   })
      // } else {
      //   this.getEmptySewa();
      // }

  getEmptySewa(): Sewa {
    return {
      id : 0,
      customerName : '',
      startTime : new Date,
      endTime : new Date,
      phoneNumber : '',
      numberOfParticipants : 0,
      eventName : '',
      notes : '',
      user: new User,
      room: this.getEmptyRoom(),
      userName: '',
      roomId: 0,
      startTimeString : '',
      endTimeString : '',
    };
  }

  getEmptyRoom(): Room {
    return {
      id: 0,
      name: '',
      description: '',
      status: 'READY',
      capacity:0
    };
  }

  defaultDate(){
    const today = new Date()
    this.tglAwal = {
      year : today.getFullYear(),
      month : today.getMonth() +1,
      day : today.getDate()
    }
  }


  newSewa() {
    this.selectedSewa = this.getEmptySewa();
    this.defaultDate()
    this.jamAwal = this.jamOperational[0];
    this.jamAkhir = this.jamOperationalAkhir[0];
  }

  backToList(){
    this.router.navigate(['/sewa'])
  }

  updateSewa() {

    if  (!this.tglAwal) {
      Swal.fire('Validation','Invalid date atau date nya kosong','error')
      return;
    }

    if (!this.isValidTimeRange()){
      Swal.fire('Validation', 'Invalid time start > end time atau Sama !', 'error')
      return;
    }


    // jam awal
    const formattedDate = `${this.tglAwal.year}-${this.tglAwal.month.toString().padStart(2, '0')}-${this.tglAwal.day.toString().padStart(2, '0')}`;
    let jamAwal = `${formattedDate} ${this.jamAwal}:00`
    // let tglAwalDate = new Date(tglAwal)
    console.log('jam awal :', jamAwal)

    // jam akhir
    const date = new Date(`1970-01-01T${this.jamAkhir}:00`); 
    date.setSeconds(date.getSeconds() - 1); 
    const newTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const formattedDateAkhir = `${this.tglAwal.year}-${this.tglAwal.month.toString().padStart(2, '0')}-${this.tglAwal.day.toString().padStart(2, '0')}`;
    let jamAkhir = `${formattedDate} ${newTime}:59`
    // let tglAkhirDate = new Date(jamAkhir)
    console.log('jam akhir :', jamAkhir)
    
    this.selectedSewa.startTimeString = jamAwal
    this.selectedSewa.endTimeString = jamAkhir
    // this.selectedSewa.room = this.selectedRoom
    this.selectedSewa.roomId = this.selectedRoom.id
    this.selectedSewa.userName = this.authenticationService.currentUserName? this.authenticationService.currentUserName : ''

    this.sewaService.createSewa(this.selectedSewa).subscribe({
      next: (response) => {
        console.log('response create sewa : ', response)
        if (response?.errorCode === '0000') {
          Swal.fire('Berhasil', 'Data berhasil di buat', 'success')
          this.selectedSewa.id =response?.object.id ;
          // this.selectedRoom = response?.object
        } else {
          Swal.fire('Gagal', response?.errorDescription, 'error')
        }
      },
      error: (error) => {
        console.log('Gagal insert ke server : ', error.message)
        Swal.fire('Gagal', error.message, 'error')
      }
    })
    // Swal.fire('Berhasil', 'Data sewa ditambahkan', 'success');
  }

  isValidTimeRange(): boolean {
    const dummyDate = '1970-01-01'; // tanggal bebas
    const startDate = new Date(`${dummyDate}T${this.jamAwal}:00`);
    const endDate = new Date(`${dummyDate}T${this.jamAkhir}:00`);
  
    return startDate.getTime() < endDate.getTime(); // start harus < end
  }
}
