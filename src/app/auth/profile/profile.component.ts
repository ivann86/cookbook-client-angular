import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { subscribeOn, tap } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { selectFeatureRecipesList, selectFeatureUser, setRecipesQuery } from 'src/app/state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user$ = this.store.select(selectFeatureUser);
  recipes$ = this.store.select(selectFeatureRecipesList);

  constructor(private store: Store, private api: ApiService) {
    this.user$.subscribe((user) => {
      this.store.dispatch(setRecipesQuery({ recipesQuery: { owner: user.id } }));
      this.api.loadRecipes().subscribe();
    });
  }
}
