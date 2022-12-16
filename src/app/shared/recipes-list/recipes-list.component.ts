import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectApiStatus,
  selectRecipesList,
  selectFeatureRecipesStats,
  selectFeatureRecipesQuery,
} from 'src/app/state';
import { RecipeQuery } from '../interfaces';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnDestroy {
  @Input() title: string = 'Рецепти';
  @Input() displayCount: boolean = true;
  @Input() navigateRouteOnChange: string = '/';

  apiStatus$ = this.store.select(selectApiStatus);
  recipes$ = this.store.select(selectRecipesList);
  recipesStats$ = this.store.select(selectFeatureRecipesStats);
  querySnapshot: RecipeQuery | null = null;
  query = this.store.select(selectFeatureRecipesQuery).subscribe((query) => {
    this.querySnapshot = query;
  });

  limit = new Map([
    [20, 'Покажи 20'],
    [40, 'Покажи 40'],
    [60, 'Покажи 60'],
  ]);

  sort = new Map([
    ['createdAt,-1', 'Най-нови'],
    ['createdAt,1', 'Най-стари'],
    ['prepTime,1', 'Най-бързи'],
    ['prepTime,-1', 'Най-бавни'],
    ['portions,-1', 'Най-много порции'],
    ['portions,1', 'Най-малко порции'],
  ]);

  constructor(private store: Store, private router: Router) {}

  ngOnDestroy(): void {
    this.query.unsubscribe();
  }

  navigatePage(page: number) {
    this.router.navigate([this.navigateRouteOnChange], {
      queryParams: Object.assign({}, this.querySnapshot, { page }),
    });
  }

  selectCount(event: Event) {
    this.router.navigate([this.navigateRouteOnChange], {
      queryParams: Object.assign({}, this.querySnapshot, { limit: (event.target as HTMLInputElement).value, page: 1 }),
    });
  }

  selectSorting(event: Event) {
    const [sort, order] = (event.target as HTMLInputElement).value.split(',');
    this.router.navigate([this.navigateRouteOnChange], {
      queryParams: Object.assign({}, this.querySnapshot, { sort, order, page: 1 }),
    });
  }
}
