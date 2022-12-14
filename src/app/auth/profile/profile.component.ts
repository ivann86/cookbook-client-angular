import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { RecipeQuery, User } from 'src/app/shared/interfaces';
import {
  selectApiStatus,
  selectFeatureRecipesQuery,
  selectFeatureRecipesStats,
  selectFeatureUser,
  selectRecipesList,
  setRecipesQuery,
} from 'src/app/state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userSnapshot: User | null = null;
  recipesQuerySnapshot: RecipeQuery | null = null;
  apiStatus$ = this.store.select(selectApiStatus);
  recipes$ = this.store.select(selectRecipesList);
  recipesStats$ = this.store.select(selectFeatureRecipesStats);
  user$ = this.store.select(selectFeatureUser).pipe(
    tap((user) => {
      this.userSnapshot = user;
      this.store.dispatch(setRecipesQuery({ recipesQuery: { owner: user.id, sort: 'createdAt', order: -1 } }));
    })
  );
  recipesQuery$ = this.store
    .select(selectFeatureRecipesQuery)
    .subscribe((query) => (this.recipesQuerySnapshot = query));

  constructor(private store: Store) {}

  navigatePage(page: number) {
    this.store.dispatch(
      setRecipesQuery({
        recipesQuery: { owner: this.userSnapshot?.id, sort: 'createdAt', order: -1, page },
      })
    );
  }
}
