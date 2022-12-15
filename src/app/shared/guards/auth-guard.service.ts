import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { selectAuthStatus } from 'src/app/state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  authStatus$ = this.store.select(selectAuthStatus);

  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authStatus$.pipe(
      filter((status) => status !== 'pending'),
      map((status) => {
        if (route.data?.['loggedInCanActivate'] === (status === 'authenticated')) {
          return true;
        }

        return this.router.parseUrl(route.data['redirect']);
      })
    );
  }
}
