import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { resetToken, setToken, setUser } from '../state';
import { selectFeatureToken, selectFeatureUser } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$: Observable<string>;

  constructor(private http: HttpClient, private store: Store) {
    this.token$ = store.select(selectFeatureToken);
    this.store.dispatch(setToken({ token: this.readSavedToken() || '' }));
    this.loadUser().subscribe({
      error: (err) => {
        if (err.status === 401) {
          this.store.dispatch(resetToken());
          this.removeSavedToken();
        }
      },
    });
  }

  register(email: string, firstName: string, lastName: string, password: string) {
    return this.http.post<any>('/api/auth/register', { email, firstName, lastName, password }).pipe(
      tap((res) => {
        if (res.data.token) {
          this.saveToken(res.data.token);
          this.store.dispatch(setToken({ token: res.data.token }));
        }
      })
    );
  }

  logIn(email: string, password: string) {
    return this.http.post<any>('/api/auth/login', { email, password }).pipe(
      tap((res) => {
        if (res.data.token) {
          this.saveToken(res.data.token);
          this.store.dispatch(setToken({ token: res.data.token }));
        }
      })
    );
  }

  logOut() {
    return this.http.get('/api/auth/logout').pipe(
      tap(() => {
        this.store.dispatch(resetToken());
      })
    );
  }

  private saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  private readSavedToken() {
    return localStorage.getItem('jwt');
  }

  private removeSavedToken() {
    return localStorage.removeItem('jwt');
  }

  private loadUser() {
    return this.http.get<any>('/api/auth/profile').pipe(
      tap((res) => {
        if (res.data.user) {
          this.store.dispatch(setUser({ user: res.data.user }));
          console.log(res.data.user);
        }
      })
    );
  }
}
