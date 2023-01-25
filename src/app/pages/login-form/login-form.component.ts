import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from 'src/app/_services/authService/auth-service.service'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiErrorDto } from 'src/app/_models/errorApi';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),

  })

  errorMessage: string;
  isLoading = false;

  constructor(private authService: AuthService,
    @Inject(DOCUMENT) private _document : Document,
    private router: Router,
    private route : ActivatedRoute,

    ) {}

  ngOnInit(): void {  
    if(this.authService.currentUser != null) {this.router.navigate(["/calendar"])};
    this._document.body.classList.add('bodybg');
    

  }
  ngOnDestroy() {
    this._document.body.classList.remove('bodybg');
  }

  get form() { return this.loginForm.controls; };

  

  onSubmit() {
    this.errorMessage = "";
    this.isLoading = true;

    setTimeout( ( ) => {
    this.authService.login(this.form['email'].value, this.form['password'].value).subscribe({
        next : () => {
          let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/calendar';
          this.router.navigate([returnUrl]).then(() => window.location.reload());
        },
        error : (error : ApiErrorDto) => {this.errorMessage = error.message, this.isLoading = false },
        complete: () =>   this.isLoading = false
      })
       
  },1000)
    
  }
}
