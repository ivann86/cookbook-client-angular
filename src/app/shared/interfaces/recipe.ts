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
