import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { resetToken, resetUser, selectFeatureToken, selectFeatureUser, setToken, setUser } from '../state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$: Observable<string>;
  user$: Observable<any>;

  constructor(private http: HttpClient, private store: Store) {
    this.token$ = store.select(selectFeatureToken);
    this.user$ = store.select(selectFeatureUser);
    this.store.dispatch(setToken({ token: this.readSavedToken() || '' }));
  }

  register(email: string, firstName: string, lastName: string, password: string) {
    return this.http.post<any>('/api/auth/register', { email, firstName, lastName, password }).pipe(
      tap((res) => {
        if (res.data.token) {
          this.saveToken(res.data.token);
          this.store.dispatch(setToken({ token: res.data.token }));
          this.loadUser().subscribe();
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
          this.loadUser().subscribe();
        }
      })
    );
  }

  logOut() {
    return this.http.get('/api/auth/logout').pipe(
      tap(() => {
        this.removeSavedToken();
        this.store.dispatch(resetToken());
        this.store.dispatch(resetUser());
      })
    );
  }

  loadUser() {
    return this.http.get<any>('/api/auth/profile').pipe(
      tap((res) => {
        if (res.data?.user) {
          this.store.dispatch(setUser({ user: res.data.user }));
        }
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
}
