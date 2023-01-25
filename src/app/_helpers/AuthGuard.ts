
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../_services/authService/auth-service.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private authService:AuthService
  ){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const cUser = this.authService.currentUserValue;
    if(cUser) {
 
      return true;
    }

    return this.router.createUrlTree(['login'],{ queryParams : { returnUrl: state.url}});
  }

}