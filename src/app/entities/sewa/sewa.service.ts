import { Injectable, signal, WritableSignal } from '@angular/core';
import { Sewa, SewaPageDto } from './sewa.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_PATH } from 'src/app/share/base-constant';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<Sewa>;

@Injectable({
  providedIn: 'root'
})
export class SewaService {

  private serverUrl = SERVER_PATH + '/bookings';
  private selectedSewaIdSignal = signal<number | null>(null)

  constructor(private http: HttpClient) { }
  
  setSelecteSewaId(id: number) {
    this.selectedSewaIdSignal.set(id);
  }

  get selectedSewaId(): WritableSignal<number | null> {
    return this.selectedSewaIdSignal;
  }

  getSewaById(id : number): Observable<Sewa> {

    let newresourceUrl = this.serverUrl + `/id/${id}`;
    return this.http.get<Sewa>(newresourceUrl) 
  }

  filter(req?: any): Observable<HttpResponse<SewaPageDto>> {
    let newresourceUrl = null;

    newresourceUrl = this.serverUrl + `/filter`;

    console.log("POST ke", newresourceUrl, "dengan payload:", req['filter']);

    return this.http.post<SewaPageDto>(
      newresourceUrl, 
      req['filter'], 
      { observe: 'response'}
      );
  }

  download(req?: any): Observable<HttpResponse<Blob>> {
    const newresourceUrl = this.serverUrl + `/report/daily`;
    console.log("POST ke", newresourceUrl, "dengan payload:", req['filter']);
  
    return this.http.post<Blob>(
      newresourceUrl,
      req['filter'],
      {
        responseType: 'blob' as 'json',
        observe: 'response'
      }
    );
  }

  createSewa(sewa: Sewa): Observable<any> {
    let newresourceUrl = this.serverUrl;
    return this.http.post<any>(newresourceUrl, sewa);
  }

  updateSewa(sewa: Sewa): Observable<any> {
    let newresourceUrl = this.serverUrl;
    return this.http.put<any>(newresourceUrl, sewa);
  }

}
