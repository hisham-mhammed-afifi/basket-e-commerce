import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error = false;
  clicked = false;
  showCredenials = false;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  password = new FormControl('', Validators.required);
  remember = new FormControl('');

  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  });

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.clicked = true;
    const { username, password } = this.loginForm?.value;
    if (!username || !password) return;
    this.authSrv.login({ username, password }).subscribe({
      next: (res: AuthResponse) => {
        const user = {
          name: res.firstName + ' ' + res.lastName,
          email: res.email,
          image: res.image,
        };
        this.authSrv.user = user;
        this.authSrv.loggedIn = true;
        this.authSrv.setUser(user);
        this.authSrv.setToken(res.token);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.error = true;
        console.error(error.message);
      },
      complete: () => {
        this.clicked = false;
        console.log('...');
      },
    });
  }
}
