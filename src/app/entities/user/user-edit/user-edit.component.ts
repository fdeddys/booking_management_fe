import { Component, effect } from '@angular/core';
import { UserDto } from '../user-model';
import { UserService } from '../user.service';
import { Data, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/theme/shared/service';

@Component({
  selector: 'app-user-edit',
  imports: [ FormsModule, CommonModule,],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {

  selectedUser: UserDto = this.getEmptyData();

  constructor(
    private userService : UserService,
    private router: Router,
  ) {
    effect(()=>{
      const selectedId = this.userService.selectedUserId(); 
      console.log("User detail all.." + selectedId)
      if (selectedId) {
        this.userService.getUserById(selectedId).subscribe({
          next: (user) => {
            this.selectedUser = user

          },
          error: (error) => {
            console.log("Error get by id : ", selectedId)
          }
        })
      } else {
        this.newUser();
      }
    })
  }
  
  ngOnInit() {
  }

  newUser() {
    this.selectedUser = this.getEmptyData();
  }

  getEmptyData(): UserDto {
    return {
      id: 0,
      username: '',
      password: '',
      role :'ADMIN'
    };
  }

  updateUser() {
    if (!this.selectedUser.username) {
      Swal.fire('Gagal', 'User not selected', 'error')
      return
    }

    if (this.selectedUser.password=="") {
      Swal.fire('Gagal', 'Password empty', 'error')
      return
    }

    this.userService.createUser(this.selectedUser).subscribe({
      next: (response) => {
        if (response?.errorCode === '0000') {
          Swal.fire('Berhasil', 'Data berhasil di buat', 'success')
          this.selectedUser = response?.object
        } else {
          Swal.fire('Gagal', response?.errorDescription, 'error')
        }
      },
      error: (error) => {
        console.log('Gagal insert ke server : ', error.message)
        Swal.fire('Gagal', error.message, 'error')
      }
    })
    Swal.fire('Berhasil', 'Data  ditambahkan', 'success');

  }

  backToList(){
    this.router.navigate(['/users'])
  }
}
