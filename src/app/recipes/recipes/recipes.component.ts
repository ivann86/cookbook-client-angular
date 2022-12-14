import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/shared/api.service';
import { RecipeQuery } from 'src/app/shared/interfaces';
import {
  resetRecipesList,
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
  recipes$ = this.store.select(selectRecipesList);
  query = this.store.select(selectFeatureRecipesQuery).subscribe((query) => {
    this.querySnapshot = query;
  });
  querySnapshot: RecipeQuery | null = null;
  total = 0;
  limit: number = 20;
  currentPage: number = 0;
  pages: number[] = [];
  apiStatus$ = this.store.select(selectApiStatus);

  constructor(private api: ApiService, private store: Store, private route: ActivatedRoute) {
    this.store.select(selectFeatureRecipesStats).subscribe((stats) => {
      this.total = stats.total;
      let firstPage = stats.page - 3;
      if (firstPage < 1) firstPage = 1;
      const length = stats.pageCount > 7 ? 7 : stats.pageCount;
      if (length + firstPage - 1 > stats.pageCount) firstPage = stats.pageCount - length + 1;
      this.pages = Array.from({ length }, (_, i) => i + firstPage);
      this.currentPage = stats.page;
      this.limit = stats.limit;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setRecipesQuery({ recipesQuery: this.route.snapshot.data['query'] }));
  }

  navigatePage(page: number) {
    this.store.dispatch(
      setRecipesQuery({
        recipesQuery: { page },
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
    this.store.dispatch(setRecipesQuery({ recipesQuery: { ...this.querySnapshot, tags } }));
  }
}
