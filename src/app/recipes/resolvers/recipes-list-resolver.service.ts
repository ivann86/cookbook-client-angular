import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecipesListResolverService implements Resolve<Recipe[]> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<any[]> {
    return this.api.loadAllRecipes();
  }
}
