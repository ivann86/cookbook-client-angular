import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import {
  resetRecipesList,
  resetRecipesQuery,
  selectApiStatus,
  selectFeatureUser,
  selectRecipesList,
  setRecipesQuery,
} from 'src/app/state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  apiStatus$ = this.store.select(selectApiStatus);
  recipes$ = this.store.select(selectRecipesList);
  user$ = this.store
    .select(selectFeatureUser)
    .pipe(tap((user) => this.store.dispatch(setRecipesQuery({ recipesQuery: { owner: user.id } }))));

  constructor(private store: Store, private api: ApiService) {
    // this.store.dispatch(resetRecipesList());
    // this.user$.subscribe((user) => this.store.dispatch(setRecipesQuery({ recipesQuery: { owner: user.id } })));
  }

  ngOnInit(): void {}
}
