import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthRequest } from '../AuthRequest';
import { match } from '../shared/passwordValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  request: AuthRequest = {
    userName: '',
    password: ''
  }

  input: string = '';
  visibility = false;
  errorMsg = "";

  private unsubscriber : Subject<void> = new Subject<void>();
  
  ngOnInit(): void {
    this.input = 'password'

    history.pushState(null,'', location.href);
    fromEvent(window, 'popstate').pipe(
     takeUntil(this.unsubscriber)
   ).subscribe((_) => {
     history.pushState(null, '');
     alert(`You can't go back at this time.`);
   });
  }
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

  }

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  }
  );

  get name(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onClick() {
    if (this.input === 'password') {
      this.input = 'text';
      this.visibility = true;
    } else {
      this.input = 'password';
      this.visibility = false;
    }
  }

  login(){
    this.request.userName = this.loginForm.get('username')?.value!;
    this.request.password = this.loginForm.get('password')?.value!;

    this.authService.login(this.request).subscribe(
    { 
      next: (data) =>
      {
        this.authService.storeToken(data.jwt);
        this.authService.getUserRole(this.request.userName).subscribe(
          {
            next: (user) =>{
              localStorage.setItem("currentUser", JSON.stringify(user));
              if(user.role == 'ROLE_USER'){
                console.log(user.role);
                this.router.navigate(['user-dashboard'])
              }
              else{
                this.router.navigate(['admin-dashboard'])
              }
            }
          }
         );
    
    },
    error: (data) => this.errorMsg = "Invalid Username/Password"
      }
  )
}
}
