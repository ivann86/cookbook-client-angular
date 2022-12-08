import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectFeatureUser } from '../state/auth.selectors';
import { Recipe } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  user$: Observable<any> = this.store.select(selectFeatureUser);
  userSnapshop: any = null;

  constructor(private http: HttpClient, private store: Store) {
    this.user$.subscribe((user) => (this.userSnapshop = user));
  }

  public loadAllRecipes() {
    return this.http.get<any>(`/api/recipes`).pipe(
      map((res) => res.data.items),
      map((recipes: Recipe[]) =>
        recipes.map((recipe) => ({ ...recipe, isOwner: recipe.owner === this.userSnapshop?.id }))
      )
    );
  }

  public loadRecipe(id: string) {
    return this.http.get<any>(`/api/recipes/${id}`).pipe(
      map((res) => res.data.recipe),
      map((recipe) => ({ ...recipe, isOwner: recipe.owner === this.userSnapshop?.id }))
    );
  }

  public addRecipe(recipe: Recipe, image: File | null) {
    const formData = new FormData();
    for (let [key, value] of Object.entries(recipe)) {
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.post<any>(`/api/recipes`, formData);
  }

  public getCountriesList() {
    return this.http
      .get<string[]>('https://restcountries.com/v3.1/all')
      .pipe(
        map((countries) =>
          countries.map((country: any) => country.name.common).sort((a: string, b: string) => a.localeCompare(b))
        )
      );
  }
}
