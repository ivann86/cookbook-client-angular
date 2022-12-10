import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { count, map, Observable, tap } from 'rxjs';
import { selectFeatureRecipesQuery, setRecipesList, setRecipesQuery, setRecipesStats } from '../state';
import { selectFeatureUser } from '../state/auth.selectors';
import { Recipe, RecipeQuery } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  user$: Observable<any> = this.store.select(selectFeatureUser);
  recipeQuery$ = this.store.select(selectFeatureRecipesQuery);
  userSnapshop: any = null;
  recipeQuerySnapshot: RecipeQuery | null = null;

  constructor(private http: HttpClient, private store: Store) {
    this.user$.subscribe((user) => (this.userSnapshop = user));
    this.recipeQuery$.subscribe((query) => {
      this.recipeQuerySnapshot = query;
    });
  }

  public loadRecipes() {
    const tags = Object.values(this.recipeQuerySnapshot!.tags!)
      .map((obj) => Object.entries(obj).map(([key, value]) => (value ? key : null)))
      .flat()
      .filter((tag) => !!tag)
      .join(',')
      .toLowerCase();
    const params = Object.entries(Object.assign({}, this.recipeQuerySnapshot!, { tags })).filter(
      ([key, value]) => !!value
    );
    return this.http.get<any>(`/api/recipes`, { params: Object.fromEntries(params) }).pipe(
      map((res) => res.data),
      tap((data) =>
        this.store.dispatch(
          setRecipesStats({
            recipesStats: {
              total: data.total,
              count: data.count,
              page: data.page,
              pageCount: Math.ceil(data.total / data.limit),
              limit: data.limit,
            },
          })
        )
      ),
      map((data) => {
        data.items.forEach((recipe: Recipe) => (recipe.isOwner = recipe.owner === this.userSnapshop?.id));
        return data.items;
      })
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
    return this.http
      .delete(`/api/recipes/${slug}`)
      .pipe(tap(() => this.store.dispatch(setRecipesQuery({ recipesQuery: this.recipeQuerySnapshot! }))));
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
