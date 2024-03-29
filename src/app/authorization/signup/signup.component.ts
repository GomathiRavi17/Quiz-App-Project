import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { match } from '../shared/passwordValidator';
import { User } from './User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  roleHasError = true;
  input: string = '';
  confirmPass: string = '';
  visibility: boolean = false;
  cvisibility: boolean = false;

  user: User = {
    userName: '',
    email: '',
    password: '',
    active: false,
    role: ''
  }

  ngOnInit(): void {
    this.input = "password";
    this.confirmPass = "password";
  }

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) {

  }

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$'),Validators.maxLength(25)]],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', Validators.required]
  },
    {
      validators: match('password', 'confirmPassword')
    }
  );

  validateRole(value: any) {
    if (value === "default") {
      this.roleHasError = true;
    }
    else {
      this.roleHasError = false;
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get roles() {
    return this.signupForm.get('roles');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
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

  onChange() {
    if (this.confirmPass === 'password') {
      this.confirmPass = 'text';
      this.cvisibility = true;
    } else {
      this.confirmPass = 'password';
      this.cvisibility = false;
    }
  }

  onSubmit() {
    this.user = {
      userName: this.signupForm.get('username')?.value!,
      email: this.signupForm.get('email')?.value!,
      password: this.signupForm.get('password')?.value!,
      active: true,
      role: "ROLE_USER"
    }
    console.log(this.user);
    this.authService.register(this.user).subscribe(
      {
        next: (data) => console.log(data),
        error: ()=>{ 
          if(confirm("Registered Successfully!")){
            this.router.navigate(['/login']);
          }
        },
      }
    );
  }
}
