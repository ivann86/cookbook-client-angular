import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRecipesSamples, resetRecipeSamples, selectRecipesSamples } from 'src/app/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  recipeSamples$ = this.store.select(selectRecipesSamples);
  count: number = 10;
  carousels = [
    { name: 'Закуска', tags: ['закуска'], count: this.count },
    { name: 'Обяд', tags: ['обяд'], count: this.count },
    { name: 'Вечеря', tags: ['вечеря'], count: this.count },
    { name: 'Салати', tags: ['салати'], count: this.count },
    { name: 'Сладкиши', tags: ['сладкиши'], count: this.count },
    { name: 'Печива', tags: ['печива'], count: this.count },
    { name: 'Здравословни', tags: ['здравословно'], count: this.count },
  ];

  constructor(private store: Store) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetRecipeSamples());
  }

  ngOnInit(): void {
    this.carousels.forEach((carousel) => this.store.dispatch(getRecipesSamples(carousel)));
  }
}
