import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { RecipeQuery } from 'src/app/shared/interfaces';
import { resetRecipesQuery, selectFeatureRecipesQuery } from 'src/app/state';

@Injectable({
  providedIn: 'root',
})
export class RecipesQueryResolverService implements Resolve<Observable<RecipeQuery>> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RecipeQuery> {
    this.store.dispatch(resetRecipesQuery());

    return this.store.select(selectFeatureRecipesQuery).pipe(
      map((query) => {
        const newQuery: RecipeQuery = {};
        Object.keys(query).forEach((key) => {
          newQuery[key as keyof RecipeQuery] = route.queryParams[key] || query[key as keyof RecipeQuery];
        });
        return newQuery;
      })
    );
  }
}
