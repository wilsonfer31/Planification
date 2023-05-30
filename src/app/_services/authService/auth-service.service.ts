import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";
import { AuthenticationResponseDTO } from 'src/app/_models/user/AuthenticationResponseDTO';
import { environment } from 'src/app/_environement/environment';
import { Router } from '@angular/router';
import  jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;

  public currentUser: Observable<AuthenticationResponseDTO>;

  loginURL = environment.base_api_back + '/public/login';

  constructor(private httpClient: HttpClient, private router: Router) {
    let lsVal = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthenticationResponseDTO>(JSON.parse(lsVal!));
    this.currentUser = this.currentUserSubject.asObservable()
  }


  login(email: string, password: string) {
    return this.httpClient.post<any>(this.loginURL, { email, password })
      .pipe(tap(result => {

        let token =  jwt_decode(result.token);
        console.log(token);
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.currentUserSubject.next(result);
        return result;
      }),
        catchError((error) => {
          throw error;
        }),)
  }

  public get currentUserValue(): AuthenticationResponseDTO {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
    this.router.navigate(['login']);
  }
}