import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/interfaces';
import { resetToken, resetUser, setAuthStatus, setToken, setUser } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthEffectsService {
  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Authenticate user'),
      tap(() => this.store.dispatch(setAuthStatus({ status: 'pending' }))),
      mergeMap(() => {
        const token = this.readSavedToken();
        if (!token) {
          return of({ type: '[Auth] Set Auth Status', status: 'unauthenticated' });
        }
        return this.auth.loadUser().pipe(
          map((user) => {
            this.store.dispatch(setUser({ user }));
            return { type: '[Auth] Set Auth Status', status: 'authenticated' };
          }),
          catchError(() => {
            this.clearAuthData();
            return of({ type: '[Auth] Set Auth Status', status: 'unauthenticated' });
          })
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Register user'),
      tap(() => this.store.dispatch(setAuthStatus({ status: 'pending' }))),
      mergeMap(({ email, firstName, lastName, password }) =>
        this.auth.register(email, firstName, lastName, password).pipe(
          map(({ user, token }) => {
            this.setAuthData(user, token);
            return { type: '[Auth] Set Auth Status', status: 'authenticated' };
          }),
          tap(() => this.router.navigate(['/'])),
          catchError(() => of({ type: '[Auth] Set Auth Status', status: 'uauthenticated' }))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Log in user'),
      tap(() => this.store.dispatch(setAuthStatus({ status: 'pending' }))),
      mergeMap(({ email, password }) =>
        this.auth.logIn(email, password).pipe(
          map(({ user, token }) => {
            this.setAuthData(user, token);
            return { type: '[Auth] Set Auth Status', status: 'authenticated' };
          }),
          tap(() => this.router.navigate(['/'])),
          catchError(() => of({ type: '[Auth] Set Auth Status', status: 'uauthenticated' }))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Log out user'),
      mergeMap(() =>
        this.auth.logOut().pipe(
          map(() => {
            this.clearAuthData();
            return { type: '[Auth] Set Auth Status', status: 'uauthenticated' };
          }),
          tap(() => this.router.navigate(['/'])),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private auth: AuthService, private store: Store, private router: Router) {
    this.store.dispatch(setToken({ token: this.readSavedToken() || '' }));
  }

  private setAuthData(user: User, token: string) {
    this.saveToken(token);
    this.store.dispatch(setToken({ token }));
    this.store.dispatch(setUser({ user }));
  }

  private clearAuthData() {
    this.store.dispatch(resetUser());
    this.store.dispatch(resetToken());
    this.removeSavedToken();
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
