import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/app/_environement/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })

  }

  url = environment.base_api_back + '/users';

  constructor(private http: HttpClient) { }


  getUserImage(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'image/jpeg' }); 

    return this.http.get(`${this.url}/userImage`, { headers, responseType: 'blob' }).pipe(catchError(error => { throw error; }));
  }
}
