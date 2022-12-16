import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Recipe, RecipeQuery } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadSample(tags: string[], limit: number) {
    return this.http
      .get<any>('/api/recipes/sample', { params: { tags: tags.join(','), limit } })
      .pipe(map((res) => res.data.items));
  }

  public loadRecipes(query: RecipeQuery) {
    const params = Object.entries(query).filter(([key, value]) => !!value);
    return this.http.get<any>(`/api/recipes`, { params: Object.fromEntries(params) }).pipe(map((res) => res.data));
  }

  public loadRecipe(id: string) {
    return this.http.get<any>(`/api/recipes/${id}`).pipe(map((res) => res.data.recipe));
  }

  public addRecipe(recipe: Recipe, image: File | null) {
    const formData = new FormData();
    for (let [key, value] of Object.entries(recipe)) {
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.post<any>(`/api/recipes`, formData).pipe(map((res) => res.data.recipe));
  }

  public patchRecipe(slug: string, recipe: Recipe, image: File | null) {
    const formData = new FormData();
    for (let [key, value] of Object.entries(recipe)) {
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.patch<any>(`/api/recipes/${slug}`, formData).pipe(map((res) => res.data.recipe));
  }

  public deleteRecipe(slug: string) {
    return this.http.delete(`/api/recipes/${slug}`);
  }
}
