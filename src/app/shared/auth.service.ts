import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, firstName: string, lastName: string, password: string) {
    return this.http
      .post<any>('/api/auth/register', { email, firstName, lastName, password })
      .pipe(map((res) => res.data));
  }

  logIn(email: string, password: string) {
    return this.http.post<any>('/api/auth/login', { email, password }).pipe(map((res) => res.data));
  }

  logOut() {
    return this.http.get('/api/auth/logout');
  }

  loadUser() {
    return this.http.get<any>('/api/auth/profile').pipe(map((res) => res.data.user));
  }
}
