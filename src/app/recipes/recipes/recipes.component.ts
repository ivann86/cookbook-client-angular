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

  tags: [string, any[]][] = [
    ['Време', ['Закуска', 'Обяд', 'Вечеря']],
    ['Меню', ['Предястие', 'Основно', 'Десерт']],
    ['Категория', ['Сосове', 'Гарнитури', 'Супи', 'Салати', 'Печива', 'Пица']],
  ];
  selectedTags: string[] = [];

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedTags = this.route.snapshot.data['query'].tags.split(',');
    console.log(this.selectedTags);
    this.store.dispatch(setRecipesQuery({ recipesQuery: this.route.snapshot.data['query'] }));
  }

  navigatePage(page: number) {
    this.store.dispatch(
      setRecipesQuery({
        recipesQuery: { ...this.querySnapshot, page },
      })
    );
  }

  switchTag(tag: string, check: boolean) {
    if (check) {
      this.selectedTags.push(tag);
    } else if (this.selectedTags.includes(tag)) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    }
    this.store.dispatch(
      setRecipesQuery({
        recipesQuery: { ...this.querySnapshot, tags: this.selectedTags.join(',').toLowerCase(), page: 1 },
      })
    );
  }
}
