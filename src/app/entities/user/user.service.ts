import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_PATH } from 'src/app/share/base-constant';
import { UserDto } from './user-model';
import { User } from 'src/app/theme/shared/components/_helpers/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverUrl = SERVER_PATH + '/users';
  private selectedUserIdSignal = signal<number | null>(null)

  constructor(private http: HttpClient) { }

  setSelectedUserId(id: number) {
    this.selectedUserIdSignal.set(id);
  }

  get selectedUserId(): WritableSignal<number | null> {
    return this.selectedUserIdSignal;
  }

  getUserById(userId : number): Observable<UserDto> {

    let newresourceUrl = this.serverUrl + `/id/${userId}`;
    return this.http.get<UserDto>(newresourceUrl) 
  }

  updateRoom(user: UserDto): Observable<any> {
    let newresourceUrl = this.serverUrl;
    return this.http.put<any>(newresourceUrl, user);
  }

  createUser(user: UserDto): Observable<any> {
    let newresourceUrl =  SERVER_PATH + '/auth/register';
    return this.http.post<any>(newresourceUrl, user);
  }

  filter(req? : any): Observable<UserDto[]> {

    let pageNumber = 0;
    let pageCount = 0;

    Object.keys(req).forEach((key) => {
      if (key === 'page') {
          pageNumber = req[key];
      }
      if (key === 'count') {
          pageCount = req[key];
      }
  });

    let newresourceUrl = this.serverUrl + `/filter/page/${pageNumber}/count/${pageCount}`;
    return this.http.get<UserDto[]>(newresourceUrl) 
  }


}
