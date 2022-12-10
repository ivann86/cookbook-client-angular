import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  breakfastSampl$ = this.api.loadSample(['закуска'], 10);
  lunchSampl$ = this.api.loadSample(['обяд'], 10);
  dinnerSampl$ = this.api.loadSample(['вечеря'], 10);

  carousels = [
    ['Закуска', this.api.loadSample(['закуска'], 10) as Observable<Recipe[]>],
    ['Обяд', this.api.loadSample(['обяд'], 10)],
    ['Вечеря', this.api.loadSample(['вечеря'], 10)],
    ['Салати', this.api.loadSample(['салати'], 10)],
    ['Сладкиши', this.api.loadSample(['сладкиши'], 10)],
    ['Печива', this.api.loadSample(['печива'], 10)],
    ['Здравословни', this.api.loadSample(['здравословно'], 10)],
  ];

  constructor(private api: ApiService) {}

  castObservable(obs: any) {
    return obs as Observable<Recipe[]>;
  }
}
