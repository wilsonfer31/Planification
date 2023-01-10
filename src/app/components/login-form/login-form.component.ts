import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/_services/authService/auth-service.service'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 10000)
    // this.authService
    //   .login(this.form['email'].value, this.form['password'].value)
    //   .then(() => {
    //     this.isLoading = false;
 
    //   })
    //   .catch(() => {
    //     this.isLoading = false;
    //     this.errorMessage = 'Adresse email ou mot de passe incorrect';
        
    //   });
  }
}
