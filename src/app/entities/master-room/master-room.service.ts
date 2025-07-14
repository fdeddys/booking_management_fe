import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { SERVER_PATH } from 'src/app/share/base-constant';
import { Room, RoomPageDto } from './master-room.model';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<Room>;

@Injectable({
  providedIn: 'root'
})
export class MasterRoomService {

  private serverUrl = SERVER_PATH + '/room';
  private selectedRoomIdSignal = signal<number | null>(null)

  constructor(private http: HttpClient) { }

  setSelectedRoomId(id: number) {
    this.selectedRoomIdSignal.set(id);
  }

  get selectedRoomId(): WritableSignal<number | null> {
    return this.selectedRoomIdSignal;
  }

  getRoomById(roomId : number): Observable<Room> {

    let newresourceUrl = this.serverUrl + `/id/${roomId}`;
    return this.http.get<Room>(newresourceUrl) 
  }

  updateRoom(room: Room): Observable<any> {
    let newresourceUrl = this.serverUrl;
    return this.http.put<any>(newresourceUrl, room);
  }

  createRoom(room: Room): Observable<any> {
    let newresourceUrl = this.serverUrl;
    return this.http.post<any>(newresourceUrl, room);
  }
  
  filter(req?: any): Observable<HttpResponse<RoomPageDto>> {
    let pageNumber = null;
    let pageCount = null;
    let newresourceUrl = null;

    Object.keys(req).forEach((key) => {
        if (key === 'page') {
            pageNumber = req[key];
        }
        if (key === 'count') {
            pageCount = req[key];
        }
    });

    newresourceUrl = this.serverUrl + `/filter/page/${pageNumber}/count/${pageCount}`;

    console.log("POST ke", newresourceUrl, "dengan payload:", req['filter']);

    return this.http.post<RoomPageDto>(
      newresourceUrl, 
      req['filter'], 
      { observe: 'response'}
      );
  }

  getAllRoom(): Observable<Room[]> {

    let newresourceUrl = this.serverUrl + `/all`;
    return this.http.get<Room[]>(newresourceUrl) 
  }

}
