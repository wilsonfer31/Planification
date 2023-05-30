import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/_environement/environment';
import { catchError, map, Observable } from 'rxjs';
import { EventApi, EventInput } from '@fullcalendar/core';
import { eventAndTaskResponseDto } from 'src/app/_models/event/eventAndTaskResponseDto';
import { eventDto } from 'src/app/_models/event/eventDto';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })

  }

  url = environment.base_api_back + '/events';

  constructor(private http: HttpClient) { }


  getAll(): Observable<EventInput[]> {
    return this.http.get<EventInput[]>(this.url).pipe(catchError(error => { throw error; }));
  }


  saveEvent(event: EventInput | eventAndTaskResponseDto | eventDto): Observable<EventInput> {
    return this.http.post<EventInput>(this.url, event, this.httpHeaders).pipe(catchError(error => { throw error }));
  }

  getEventById(id: number): Observable<EventInput[]> {
    return this.http.get<EventInput[]>(`${this.url}/${id}`).pipe(catchError(error => { throw error; }));
  }
  delete(id: number): Observable<EventInput[]> {
    return this.http.delete<EventInput[]>(`${this.url}/${id}`).pipe(catchError(error => { throw error; }));
  }

}
