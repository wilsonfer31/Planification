import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/_services/authService/auth-service.service'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiErrorDto } from 'src/app/_models/user/errorApi';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),

  })

  errorMessage: string;
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get form() { return this.loginForm.controls; };

  

  onSubmit() {
    this.errorMessage = "";
    this.isLoading = true;

    setTimeout( ( ) => {
    this.authService.login(this.form['email'].value, this.form['password'].value).subscribe({
        error : (error : ApiErrorDto) => {this.errorMessage = error.message, this.isLoading = false },
        complete: () =>   this.isLoading = false
      })
       
  },1000)
    
  }
}
