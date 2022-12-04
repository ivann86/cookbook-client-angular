import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './interfaces';

const API_URL = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadAllRecipes() {
    return this.http.get<any>(`${API_URL}/recipes`);
  }

  public loadRecipe(id: string) {
    return this.http.get<any>(`${API_URL}/recipes/${id}`);
  }
}
