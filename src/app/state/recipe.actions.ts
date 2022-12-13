import { createAction, props } from '@ngrx/store';
import { Recipe, RecipeQuery, RecipeStats } from '../shared/interfaces';

export const setRecipesQuery = createAction('[Recipes Page] Set recipes query', props<{ recipesQuery: RecipeQuery }>());
export const resetRecipesQuery = createAction('[Recipes Page] Reset recipes query');
export const setRecipesStats = createAction('[Recipes Page] Set recipes stats', props<{ recipesStats: RecipeStats }>());
export const setRecipesList = createAction('[Recipes Page] Set recipes list', props<{ recipes: Recipe[] }>());
export const resetRecipesList = createAction('[Recipes Page] Reset recipes list');
