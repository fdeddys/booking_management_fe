import { Component } from '@angular/core';
import { User } from 'src/app/theme/shared/components/_helpers/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UserDto } from './user-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [ FormsModule, CommonModule,],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


  page = 1;
  pageSize = 8;
  totalPages = 1;
  totalData = 0;

  firstPage: boolean = true;
  lastpage: boolean = true;
  
  users: UserDto[] = [];

  constructor(
    private userService : UserService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    console.log("user load all..")
    this.loadAll();
  }

  loadAll() {
    this.userService.filter({
      page: this.page,
      count: this.pageSize
    }).subscribe({
      next: (response: any) => {
        console.log("res", response.content);
        this.users = response.content ?? [];
        this.firstPage = response.first ?? true;
        this.lastpage = response.last ?? true;
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
    this.users = data.contents;
    this.totalData = data.totalRow;
  }


  loadDetailPage(roomId: number) {
    this.userService.setSelectedUserId(roomId)
    this.router.navigate(['/users-detail'])
  }

  addnew() {
    this.userService.setSelectedUserId(0)
    this.router.navigate(['/users-detail'])
  }
}
