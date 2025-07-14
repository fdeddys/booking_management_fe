import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { Room } from 'src/app/entities/master-room/master-room.model';
import { MasterRoomService } from 'src/app/entities/master-room/master-room.service';
import { SewaService } from 'src/app/entities/sewa/sewa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-daily',
  imports: [FormsModule, CommonModule, NgbDatepickerModule],
  templateUrl: './report-daily.component.html',
  styleUrl: './report-daily.component.scss'
})
export class ReportDailyComponent implements OnInit{

  tglAwal: NgbDateStruct | null = null;
  tglAkhir: NgbDateStruct | null = null;
  selectedRoom : Room  = this.getEmptyRoom();
  allRooms: Room[] = []

  searchTerm = {
    startDate: '',
    endDate: '',
    roomId: 0,
  }

  constructor(
    private roomService : MasterRoomService,
    private router: Router,
    private sewaService: SewaService
  ) {

    this.roomService.getAllRoom().pipe(
      tap((rooms) => {
        this.allRooms = rooms;
        console.log('rooms ', rooms)
      }),
      tap(()=>{
        this.allRooms.unshift(this.getEmptyRoom())
        this.selectedRoom = this.allRooms[0]
      })
      ).subscribe()

      
  }
  ngOnInit(): void {
    this.defaultDate()
  }

  defaultDate(){
    const today = new Date()
    this.tglAwal = {
      year : today.getFullYear(),
      month : today.getMonth() +1,
      day : today.getDate()
    }
    this.tglAkhir = this.tglAwal
  }

  download() {
    this.searchTerm.startDate = this.getTglAwal()
    this.searchTerm.endDate = this.getTglAkhir()
    this.searchTerm.roomId = this.selectedRoom.id
    this.sewaService.download({
      filter: this.searchTerm,
    }).subscribe({
      next: (response) => {
        const isiBody = response.body
        if (!isiBody) {
          Swal.fire('Error', 'Empty result ', 'error')
          return;
        }
        const contentDisposition = response.headers.get('content-disposition')
        let filename = 'report'
        if (contentDisposition) {
          const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (match && match[1]) {
            filename = match[1].replace(/['"]/g, '');
          }
        }
    
        // Buat URL blob dan download
        const url = window.URL.createObjectURL(isiBody);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a); // penting di beberapa browser
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Gagal download:', err);
      }
      
    });

  }


  getTglAwal(): string  {
    if (!this.tglAwal) return '';
    const { day, month, year } = this.tglAwal;
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }

  getTglAkhir(): string  {
    if (!this.tglAkhir) return '';
    const { day, month, year } = this.tglAkhir;
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }

  onDateSelect(): void {
    console.log('Selected:', this.getTglAwal());
  }

  getEmptyRoom(): Room {
    return {
      id: 0,
      name: '- ALL ROOM',
      description: '',
      status: 'READY',
      capacity:0
    };
  }

}
