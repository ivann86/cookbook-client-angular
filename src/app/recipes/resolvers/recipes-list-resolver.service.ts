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
export class RecipesListResolverService implements Resolve<Observable<RecipeQuery>> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeQuery> {
    return new Observable((sub) => {
      this.store.select(selectFeatureRecipesQuery).subscribe((query) => {
        const limit = +route.queryParams['limit'] || query.limit;
        const page = +route.queryParams['page'] || query.page;
        const country = route.queryParams['country'];
        const tags: any = {};

        ((route.queryParams['tags'] || '').split(',') as string[])
          .map((tagInQuery) => tagInQuery.trim())
          .forEach((tagInQuery) => {
            for (let category in query.tags) {
              tags[category] = {};
              for (let tag in query.tags[category]) {
                tags[category][tag] = tag.toLowerCase() === tagInQuery.toLowerCase();
              }
            }
          });

        sub.next(Object.assign({}, query, { limit, page, country, tags }));
      });
    });
  }
}
