import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseUrl } from 'src/environments/environment';

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseUrl = BaseUrl + '/auth';

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  get loggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  set loggedIn(value: any) {
    this.isLoggedIn.next(value);
  }

  private userSub = new BehaviorSubject<User>(this.emptyUser());
  get user(): Observable<User> {
    return this.userSub.asObservable();
  }

  set user(user: any) {
    this.userSub.next(user);
  }

  constructor(private _http: HttpClient) {
    this.user = this.getUser() ?? this.emptyUser();
    this.loggedIn = !!this.getToken();
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(this.BaseUrl + '/login', credentials);
    // .pipe(
    //   catchError((err) => {
    //     return of(err.message);
    //   })
    // );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedin');
    this.user = { name: '', email: '', image: '' };
  }

  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token) ?? '');
  }

  getToken(): User {
    return JSON.parse(localStorage.getItem('token') ?? JSON.stringify(''));
  }

  setUser(user: User) {
    localStorage.setItem('loggedin', JSON.stringify(user) ?? '');
  }

  getUser(): User {
    return JSON.parse(
      localStorage.getItem('loggedin') ?? JSON.stringify(this.emptyUser())
    );
  }

  emptyUser(): User {
    return { name: '', email: '', image: 'assets/images/user-placeholder.svg' };
  }
}
