import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RecipeQuery } from 'src/app/shared/interfaces';
import { selectFeatureRecipesQuery } from 'src/app/state';

@Injectable({
  providedIn: 'root',
})
export class RecipesQueryResolverService implements Resolve<Observable<RecipeQuery>> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RecipeQuery> {
    return new Observable((sub) => {
      this.store.select(selectFeatureRecipesQuery).subscribe((query) => {
        const newQuery: RecipeQuery = {};

        Object.keys(query).forEach((key) => {
          newQuery[key as keyof RecipeQuery] = route.queryParams[key] || query[key as keyof RecipeQuery];
        });

        sub.next(newQuery);
      });
    });
  }
}
