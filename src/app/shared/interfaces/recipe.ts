import { User } from './user';

export interface Ingredient {
  name: string;
  quantity: number;
  units: string;
}

export interface Recipe {
  id?: string;
  name: string;
  slug: string;
  description: string;
  imgUrl: string;
  imgSmallUrl: string;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: number;
  portions: number;
  tags: string[];
  owner?: User;
  isOwner?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RecipeStats {
  total: number;
  count: number;
  page: number;
  pageCount: number;
  limit: number;
}

export interface RecipeQuery {
  search?: string;
  limit?: number | string;
  page?: number | string;
  country?: string;
  sort?: string;
  order?: number | string;
  owner?: string;
  tags?: string;
}

export interface RecipeSample {
  name: string;
  tags: string[];
  recipes: Recipe[];
}
