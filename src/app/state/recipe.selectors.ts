import { createFeatureSelector } from '@ngrx/store';
import { Recipe, RecipeQuery, RecipeStats } from '../shared/interfaces';

export const selectFeatureRecipesQuery = createFeatureSelector<RecipeQuery>('recipesQuery');
export const selectFeatureRecipesStats = createFeatureSelector<RecipeStats>('recipesStats');
export const selectFeatureRecipesList = createFeatureSelector<Recipe[]>('recipes');
