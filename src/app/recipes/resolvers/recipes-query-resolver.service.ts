import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe, RecipeQuery } from 'src/app/shared/interfaces';
import { selectFeatureRecipesQuery } from 'src/app/state';

@Injectable({
  providedIn: 'root',
})
export class RecipesQueryResolverService implements Resolve<Observable<RecipeQuery>> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeQuery> {
    return new Observable((sub) => {
      this.store.select(selectFeatureRecipesQuery).subscribe((query) => {
        const newQuery: RecipeQuery = {};

        Object.keys(query).forEach((key) => {
          newQuery[key as keyof RecipeQuery] = route.queryParams[key] || query[key as keyof RecipeQuery];
        });

        newQuery.tags = {};

        ((route.queryParams['tags'] || '').split(',') as string[])
          .map((tagInQuery) => tagInQuery.trim())
          .forEach((tagInQuery) => {
            for (let category in query.tags) {
              newQuery.tags![category] = {};
              for (let tag in query.tags[category]) {
                newQuery.tags![category][tag] = tag.toLowerCase() === tagInQuery.toLowerCase();
              }
            }
          });

        sub.next(newQuery);
      });
    });
  }
}
