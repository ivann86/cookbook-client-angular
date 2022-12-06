import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadAllRecipes() {
    return this.http.get<any>(`/api/recipes`);
  }

  public loadRecipe(id: string) {
    return this.http.get<any>(`/api/recipes/${id}`);
  }
}
