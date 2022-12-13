import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { selectFeatureUser, selectRecipesList, setRecipesQuery } from 'src/app/state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  recipes$ = this.store.select(selectRecipesList);
  user$ = this.store
    .select(selectFeatureUser)
    .pipe(tap((user) => this.store.dispatch(setRecipesQuery({ recipesQuery: { owner: user.id } }))));

  constructor(private store: Store, private api: ApiService) {}
}
