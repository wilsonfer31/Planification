
import { Observable,catchError, throwError} from 'rxjs';
import { HttpResponse , HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../_services/authService/auth-service.service';
import { environment } from '../_environement/environment';




@Injectable()
export class JwtInterceptor implements HttpInterceptor{


  constructor(private authService:AuthService, private router : Router){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const currentUser = this.authService.currentUserValue;
    if(currentUser && currentUser.token && req.url.startsWith(environment.base_api_back)){

      req = req.clone({
        setHeaders: {
          Authorization:`Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(req);
  }
}