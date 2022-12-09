import { createReducer, on } from '@ngrx/store';
import { Recipe, RecipeQuery, RecipeStats } from '../shared/interfaces';
import { setRecipesList, resetRecipesQuery, setRecipesQuery, setRecipesStats } from './recipe.actions';

const tags = {
  For: { Закуска: false, Обяд: false, Вечеря: false },
  Meal: { Предястие: false, Основно: false, Десерт: false },
  Category: { Сосове: false, Гарнитури: false, Супи: false, Салати: false, Печива: true },
};

export const initalRecipesQueryState: RecipeQuery = { page: 1, limit: 20, country: '', tags };
export const initialRecipesStatsState: RecipeStats = { total: 0, count: 0, limit: 20, page: 0, pageCount: 0 };
export const initialRecipesListState: Recipe[] = [];

export const recipesQueryReducer = createReducer(
  initalRecipesQueryState,
  on(setRecipesQuery, (state, { recipesQuery }) => ({ ...state, ...recipesQuery })),
  on(resetRecipesQuery, () => initalRecipesQueryState)
);

export const recipesStatsReducer = createReducer(
  initialRecipesStatsState,
  on(setRecipesStats, (state, { recipesStats }) => ({ ...state, ...recipesStats }))
);

export const recipesListReduces = createReducer(
  initialRecipesListState,
  on(setRecipesList, (state, { recipes }) => recipes),
  on(resetRecipesQuery, () => [])
);
