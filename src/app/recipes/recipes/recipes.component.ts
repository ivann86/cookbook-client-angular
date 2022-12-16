import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeQuery } from 'src/app/shared/interfaces';
import { resetRecipesQuery, selectFeatureRecipesQuery, setRecipesQuery } from 'src/app/state';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  querySnapshot: RecipeQuery | null = null;
  query = this.store.select(selectFeatureRecipesQuery).subscribe((query) => {
    this.querySnapshot = query;
  });

  tags: [string, any[]][] = [
    ['Време', ['Закуска', 'Обяд', 'Вечеря']],
    ['Меню', ['Предястие', 'Основно', 'Десерт']],
    ['Категория', ['Сосове', 'Гарнитури', 'Супи', 'Салати', 'Печива', 'Пица', 'Паста']],
  ];
  selectedTags: string[] = [];

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnDestroy(): void {
    this.query.unsubscribe();
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.store.dispatch(resetRecipesQuery());
    this.store.dispatch(setRecipesQuery({ recipesQuery: Object.assign({}, this.querySnapshot, queryParams) }));
    if (!queryParams['search'] && queryParams['search'] === '' && queryParams['tags']) {
      this.selectedTags = queryParams['tags'].split(',');
    }
  }

  switchTag(tag: string, check: boolean) {
    if (!tag) {
      this.selectedTags = [];
    } else {
      if (check) {
        this.selectedTags.push(tag);
      } else if (this.selectedTags.includes(tag)) {
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      }
    }

    const tags = this.selectedTags.join(',').toLowerCase() || '';
    this.router.navigate(['recipes'], {
      queryParams: Object.assign({}, this.querySnapshot, { tags, page: 1, search: '' }),
    });
  }
}
