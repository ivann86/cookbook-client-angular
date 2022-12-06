import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserState } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  user: any | undefined = undefined;

  constructor(private http: HttpClient, @Inject(UserState) private userState: BehaviorSubject<any>) {
    this.token = this.readSavedToken() || '';
    if (this.token) {
      this.loadUser().subscribe();
    }
  }

  register(email: string, firstName: string, lastName: string, password: string) {
    return this.http.post<any>('/api/auth/register', { email, firstName, lastName, password }).pipe(
      tap((res) => {
        this.user = res.data.user;
        this.token = res.data.token;
        this.userState.next({ user: this.user, token: this.token });
        this.saveToken();
      })
    );
  }

  logIn(email: string, password: string) {
    return this.http.post<any>('/api/auth/login', { email, password }).pipe(
      tap((res) => {
        this.user = res.data.user;
        this.token = res.data.token;
        this.userState.next({ user: this.user, token: this.token });
        this.saveToken();
      })
    );
  }

  logOut() {
    return this.http.get('/api/auth/logout').pipe(
      tap(() => {
        this.user = undefined;
        this.token = '';
      })
    );
  }

  private saveToken() {
    localStorage.setItem('jwt', this.token);
  }

  private readSavedToken() {
    return localStorage.getItem('jwt');
  }

  private loadUser() {
    return this.http.get<any>('/api/auth/profile').pipe(tap((res) => (this.user = res.data.user)));
  }
}
