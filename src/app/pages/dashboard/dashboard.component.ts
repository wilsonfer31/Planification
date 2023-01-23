import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toogled : boolean = false;


   toogleMenu(): void{
    this.toogled = !this.toogled;
  }
}


