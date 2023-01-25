import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/authService/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toogled : boolean = false;


  constructor(private autheService : AuthService){

  }

   toogleMenu(): void{
    this.toogled = !this.toogled;
  }

  logOut(): void{
    this.autheService.logout();
  }
}


