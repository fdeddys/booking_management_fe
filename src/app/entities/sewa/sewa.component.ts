import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sewa } from './sewa.model';
import { Router } from '@angular/router';
import { SewaService } from './sewa.service';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sewa',
  imports: [FormsModule, CommonModule,NgbDatepickerModule],
  templateUrl: './sewa.component.html',
  styleUrl: './sewa.component.scss'
})
export class SewaComponent implements OnInit {

  tglAwal: NgbDateStruct | null = null;
  tglAkhir: NgbDateStruct | null = null;
  page = 1;
  pageSize = 8;
  searchTerm = {
    startDate: '',
    endDate: '',
    page: 0,
    size: 0
  }
  firstPage: boolean = true;
  lastpage: boolean = true;

  sewas: Sewa[] = [];

  constructor(
    private sewaService : SewaService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    console.log("sewa load all..")
    this.defaultDate()
    this.loadAll();
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

  loadAll() {
    this.searchTerm.page = this.page -1
    this.searchTerm.size = this.pageSize
    this.searchTerm.startDate = this.getTglAwal()
    this.searchTerm.endDate = this.getTglAkhir()
    this.sewaService.filter({
      filter: this.searchTerm,
    }).subscribe({
      next: (response) => {
        console.log("res", response.body);
        this.sewas = response.body?.content ?? [];
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

  loadDetailPage(id: number) {
    this.sewaService.setSelecteSewaId(id)
    this.router.navigate(['/sewa-detail'])
  }

  addnew() {
    this.sewaService.setSelecteSewaId(0)
    this.router.navigate(['/sewa-detail'])
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

  viewTime(tanggal1: Date, tanggal2: Date ): String {
    const date1 = new Date(tanggal1);
    const time1 = date1.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const date2 = new Date(tanggal2);
    const time2 = date2.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
   return `${time1} - ${time2}`;
  }

}
