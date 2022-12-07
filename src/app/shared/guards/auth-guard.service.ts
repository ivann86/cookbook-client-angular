import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectFeatureUser } from 'src/app/state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  user$: Observable<any>;

  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(selectFeatureUser);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.user$.pipe(
      map((user) => {
        if (route.data?.['loggedInCanActivate'] === !!user) {
          return true;
        }
        return this.router.parseUrl(route.data['redirect']);
      })
    );
  }
}
