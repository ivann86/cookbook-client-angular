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
  country: string;
  tags: string[];
  owner?: string;
  isOwner?: boolean;
}

export interface RecipeStats {
  total: number;
  count: number;
  page: number;
  pageCount: number;
  limit: number;
}

export interface RecipeQuery {
  limit?: number;
  page?: number;
  country?: string;
  tags?: { [key: string]: any };
}
