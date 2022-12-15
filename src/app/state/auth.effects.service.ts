import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, tap, catchError, EMPTY, withLatestFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { selectRecipesSamples, setRecipesStats } from './recipe.state';
import { selectFeatureRecipesQuery } from './recipe.state';

@Injectable({
  providedIn: 'root',
})
export class AuthEffectsService {
  // loadRecipesSample$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('[Samples] Get recipes samples'),
  //     withLatestFrom(this.store.select(selectRecipesSamples)),
  //     mergeMap(([{ name, tags, count }]) =>
  //       this.api.loadSample(tags, count).pipe(
  //         map((res) => ({ type: '[Samples] Set recipes samples', sample: { name, recipes: res.data.items } })),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   )
  // );
  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Authenticate user'),
      mergeMap(() => {})
    )
  );

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private store: Store
  ) {}
}
