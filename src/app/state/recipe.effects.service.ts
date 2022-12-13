import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, mergeMap, map, of, tap } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { setRecipesStats } from './recipe.actions';

@Injectable({
  providedIn: 'root',
})
export class RecipeEffectsService {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Recipes Page] Set recipes query'),
      mergeMap(() =>
        this.api.loadRecipes().pipe(
          map((res) => res.data),
          tap((data) =>
            this.store.dispatch(
              setRecipesStats({
                recipesStats: {
                  total: data.total,
                  count: data.count,
                  page: data.page,
                  pageCount: Math.ceil(data.total / data.limit),
                  limit: data.limit,
                },
              })
            )
          ),
          map((data) => {
            return { type: '[Recipes Page] Set recipes list', recipes: data.items };
          }),
          catchError(() => of({ type: '[API] Set status' }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApiService, private store: Store) {}
}
