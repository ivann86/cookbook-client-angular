import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, tap, catchError, EMPTY, withLatestFrom } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { setRecipesStats } from './recipe.state';
import { selectFeatureRecipesQuery } from './recipe.state';

@Injectable({
  providedIn: 'root',
})
export class RecipeEffectsService {
  loadRecipesSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Samples] Get recipes samples'),
      mergeMap(({ name, tags, count }) =>
        this.api.loadSample(tags, count).pipe(
          map((res) => ({ type: '[Samples] Set recipes samples', sample: { name, recipes: res.data.items } })),
          catchError(() => EMPTY)
        )
      )
    )
  );

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
          map((data) => ({ type: '[Recipes] Set recipes list', recipes: data.items })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Recipe] Set recipe query'),
      mergeMap((query: any) =>
        this.api.loadRecipe(query.slug).pipe(
          map((res) => ({ type: '[Recipe] Set selected recipe', recipe: res.data.recipe })),
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
          map(() => {
            if (this.router.routerState.snapshot.url === `/recipes/${slug}`) {
              this.router.navigate(['/recipes']);
              return { type: '[Effect] Recipe deleted' };
            }
            return { type: '[Recipes] Set recipes query', recipesQuery };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Add page] Add a recipe'),
      mergeMap(({ recipe, image }) =>
        this.api.addRecipe(recipe, image).pipe(
          map((res) => res.data.recipe),
          tap((recipe) => this.router.navigate(['recipes', recipe.slug])),
          map(() => ({ type: '[Effect] Add recipe done' })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  editRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Edit page] Edit a recipe'),
      mergeMap(({ slug, recipe, image }) =>
        this.api.patchRecipe(slug, recipe, image).pipe(
          map((res) => res.data.recipe),
          tap((recipe) => this.router.navigate(['recipes', recipe.slug])),
          map(() => ({ type: '[Effect] Edit recipe done' })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApiService, private store: Store, private router: Router) {}
}
