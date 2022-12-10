import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe, RecipeQuery } from 'src/app/shared/interfaces';
import {
  resetRecipesList,
  selectFeatureRecipesList,
  selectFeatureRecipesQuery,
  selectFeatureRecipesStats,
  setRecipesList,
  setRecipesQuery,
} from 'src/app/state';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes$ = this.store.select(selectFeatureRecipesList);
  query$ = this.store.select(selectFeatureRecipesQuery);
  querySnapshot: RecipeQuery | null = null;
  total = 0;
  limit: number = 20;
  currentPage: number = 0;
  pages: number[] = [];

  constructor(
    private api: ApiService,
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
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
    this.query$.subscribe((query) => {
      this.querySnapshot = query;
      this.api.loadRecipes().subscribe((items) => this.store.dispatch(setRecipesList({ recipes: items })));
    });
  }

  navigatePage(page: number) {
    this.store.dispatch(
      setRecipesQuery({
        recipesQuery: { ...this.querySnapshot!, page },
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
    this.store.dispatch(setRecipesQuery({ recipesQuery: { tags } }));
  }

  editHandler(slug: string) {
    this.router.navigate(['/edit-recipe/' + slug]);
  }

  removeHandler(recipe: Recipe) {
    if (!recipe.isOwner) {
      return;
    }
    if (confirm(`Are you sure you want to delete recipe "${recipe.name}"?`)) {
      this.api.deleteRecipe(recipe.slug).subscribe(() => {});
    }
  }

  cardClickHandler(e: Event, slug: string) {
    if ((e.target as HTMLElement).closest('#owner-actions')) {
      return;
    }
    this.router.navigate(['/recipes/' + slug]);
  }
}
