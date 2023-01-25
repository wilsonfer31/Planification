import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/_environement/environment';
import { catchError, map, Observable } from 'rxjs';
import { EventApi, EventInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })

  }

  url = environment.base_api_back + '/events';

  constructor(private http: HttpClient) { }


  getAll(): Observable<EventInput []> {
    return this.http.get<EventInput []>(this.url).pipe(catchError(error => {throw error;}));
  }


  saveEvent(event : EventInput) : Observable<EventInput>{
      return this.http.post<EventInput>(this.url,event, this.httpHeaders).pipe(catchError(error => {throw error}));
  }


}
