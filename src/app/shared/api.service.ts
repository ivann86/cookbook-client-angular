import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectFeatureUser } from '../state/';
import { Recipe, RecipeQuery } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  user$: Observable<any> = this.store.select(selectFeatureUser);
  userSnapshop: any = null;

  constructor(private http: HttpClient, private store: Store) {
    this.user$.subscribe((user) => (this.userSnapshop = user));
  }

  public loadSample(tags: string[], limit: number) {
    return this.http
      .get<any>('/api/recipes/sample', { params: { tags: tags.join(','), limit } })
      .pipe<Recipe[]>(map((res) => res.data.items as Recipe[]));
  }

  public loadRecipes(query: RecipeQuery) {
    console.log(query);
    const tags = Object.values(query.tags || {})
      .map((obj) => Object.entries(obj).map(([key, value]) => (value ? key : null)))
      .flat()
      .filter((tag) => !!tag)
      .join(',')
      .toLowerCase();
    const params = Object.entries(Object.assign({}, query, { tags })).filter(([key, value]) => !!value);
    return this.http.get<any>(`/api/recipes`, { params: Object.fromEntries(params) });
  }

  public loadRecipe(id: string) {
    return this.http.get<any>(`/api/recipes/${id}`).pipe(
      map((res) => res.data.recipe),
      map((recipe) => ({ ...recipe, isOwner: recipe.owner.id === this.userSnapshop?.id }))
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
