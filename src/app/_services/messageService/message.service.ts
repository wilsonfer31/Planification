import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/_environement/environment';
import { catchError,  Observable } from 'rxjs';
import { Message } from 'src/app/_models/message/MessageDto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = environment.base_api_back + '/messages';

  constructor(private http : HttpClient) { }

  
  getLastMessages(): Observable<Message []> {
    return this.http.get<Message []>(`${this.url}/chat`).pipe(catchError(error => {throw error;}));
  }

}
