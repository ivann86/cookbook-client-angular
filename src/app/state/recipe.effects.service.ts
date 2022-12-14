import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, tap, catchError, EMPTY, withLatestFrom } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { resetRecipesList, setRecipesList, setRecipesStats, setSelectedRecipe } from './recipe.state';
import { selectFeatureRecipesQuery } from './recipe.state';

@Injectable({
  providedIn: 'root',
})
export class RecipeEffectsService {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Recipes] Set recipes query'),
      mergeMap(({ recipesQuery }) =>
        this.api.loadRecipes(recipesQuery).pipe(
          map((res) => res.data),
          tap(({ total, count, page, limit }) => {
            this.store.dispatch(
              setRecipesStats({ recipesStats: { total, count, page, limit, pageCount: Math.ceil(total / limit) } })
            );
          }),
          map((data) => ({ type: '[Recipes] Set recipes list', recipes: data.items }))
        )
      )
    )
  );

  loadRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Recipe] Set recipe query'),
      mergeMap((query: any) =>
        this.api.loadRecipe(query.slug).pipe(
          map((recipe) => ({ type: '[Recipe] Set selected recipe', recipe })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Owner actions] Delete recipe'),
      withLatestFrom(this.store.select(selectFeatureRecipesQuery)),
      mergeMap(([{ slug }, recipesQuery]) =>
        this.api.deleteRecipe(slug).pipe(
          map(() => ({ type: '[Recipes] Set recipes query', recipesQuery })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApiService, private store: Store) {}
}
