import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/authService/auth-service.service';
import { UserService } from 'src/app/_services/userService/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  imageSrc : any;

  routes : Array<any>= [
     {path : "/calendar" , value : "Calendar"},
     {path : "/lastTask" , value : "Waiting Tasks"},
     {path : "/taskValidated" , value : "What have i done?"},
     {path : "/chat" , value : "Chat"},
  ]
  toogled : boolean = false;
  constructor(private autheService : AuthService , private userService : UserService){}

  ngOnInit(): void {
    this.getUserImage();
  }

  toogleMenu(): void{this.toogled = !this.toogled;}

  logOut(): void{this.autheService.logout();}

  getUserImage(): void {
    this.userService.getUserImage().subscribe( response => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(response);
    }, error => {
        this.imageSrc = "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg";
    });
  }
}


