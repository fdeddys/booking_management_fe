import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_PATH } from 'src/app/share/base-constant';
import { Room, RoomPageDto } from './master-room.model';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<Room>;

@Injectable({
  providedIn: 'root'
})
export class MasterRoomService {

  private serverUrl = SERVER_PATH + '/room';

  constructor(private http: HttpClient) { }

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

}
