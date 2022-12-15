import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipeQuery } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadSample(tags: string[], limit: number) {
    return this.http.get<any>('/api/recipes/sample', { params: { tags: tags.join(','), limit } });
  }

  public loadRecipes(query: RecipeQuery) {
    const params = Object.entries(query).filter(([key, value]) => !!value);
    return this.http.get<any>(`/api/recipes`, { params: Object.fromEntries(params) });
  }

  public loadRecipe(id: string) {
    return this.http.get<any>(`/api/recipes/${id}`);
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

  public patchRecipe(slug: string, recipe: Recipe, image: File | null) {
    const formData = new FormData();
    for (let [key, value] of Object.entries(recipe)) {
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.patch<any>(`/api/recipes/${slug}`, formData);
  }

  public deleteRecipe(slug: string) {
    return this.http.delete(`/api/recipes/${slug}`);
  }
}
