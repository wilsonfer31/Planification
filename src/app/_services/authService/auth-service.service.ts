import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { LoginResponse } from 'src/app/_models/user/loginResponse';
import { environment } from 'src/app/_environement/environment';
import { ApiErrorDto } from 'src/app/_models/user/errorApi';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;

  public currentUser: Observable<LoginResponse>;

  http = environment.base_api_back + '/login';

  constructor(private httpClient: HttpClient) { 
    let lsVal = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(lsVal!));
    this.currentUser = this.currentUserSubject.asObservable()
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(this.http, {email, password })
    .pipe(map(result => {
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.currentUserSubject.next(result);
      return result;
    }),
      catchError( (error) => {
        throw error.error;
      }),)
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
  }
}