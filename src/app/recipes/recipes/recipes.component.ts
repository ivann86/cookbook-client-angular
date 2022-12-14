import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeQuery } from 'src/app/shared/interfaces';
import {
  selectApiStatus,
  selectFeatureRecipesQuery,
  selectFeatureRecipesStats,
  selectRecipesList,
  setRecipesQuery,
} from 'src/app/state';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  apiStatus$ = this.store.select(selectApiStatus);
  recipes$ = this.store.select(selectRecipesList);
  recipesStats$ = this.store.select(selectFeatureRecipesStats);
  querySnapshot: RecipeQuery | null = null;
  query = this.store.select(selectFeatureRecipesQuery).subscribe((query) => {
    this.querySnapshot = query;
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(setRecipesQuery({ recipesQuery: this.route.snapshot.data['query'] }));
  }

  navigatePage(page: number) {
    this.store.dispatch(
      setRecipesQuery({
        recipesQuery: { ...this.querySnapshot, page },
      })
    );
  }

  switchTag(category: string, tag: string | unknown, check: boolean) {
    const tags: any = {};
    for (let category in this.querySnapshot?.tags) {
      tags[category] = Object.assign({}, this.querySnapshot?.tags[category]);
    }
    if (!tags[category]) {
      return;
    }
    tags[category][tag as string] = check;
    this.store.dispatch(setRecipesQuery({ recipesQuery: { ...this.querySnapshot, tags, page: 1 } }));
  }
}
