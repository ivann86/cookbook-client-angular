import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectFeatureUser } from 'src/app/state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  user$ = this.store.select(selectFeatureUser);

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
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
