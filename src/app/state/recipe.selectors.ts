import { createFeatureSelector, createSelector } from '@ngrx/store';
import { map } from 'rxjs';
import { Recipe, RecipeQuery, RecipeStats, User } from '../shared/interfaces';
import { selectFeatureUser } from './auth.selectors';

export const selectFeatureRecipesQuery = createFeatureSelector<RecipeQuery>('recipesQuery');
export const selectFeatureRecipesStats = createFeatureSelector<RecipeStats>('recipesStats');
export const selectFeatureRecipesList = createFeatureSelector<Recipe[]>('recipes');

export const selectRecipesList = createSelector(
  selectFeatureUser,
  selectFeatureRecipesList,
  (user: User, recipes: Recipe[]) => recipes.map((recipe) => ({ ...recipe, isOwner: recipe.owner?.id === user?.id }))
);
