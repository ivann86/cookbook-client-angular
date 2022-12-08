import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<any> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.loadRecipe(route.params['id']);
  }
}
