import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { Recipe, RecipeQuery, RecipeStats, User } from '../shared/interfaces';
import { selectFeatureUser, userReducer } from './auth.state';

// ACTIONS
export const setRecipesQuery = createAction('[Recipes] Set recipes query', props<{ recipesQuery: RecipeQuery }>());
export const resetRecipesQuery = createAction('[Recipes] Reset recipes query');
export const setRecipesStats = createAction('[Recipes] Set recipes stats', props<{ recipesStats: RecipeStats }>());
export const setRecipesList = createAction('[Recipes] Set recipes list', props<{ recipes: Recipe[] }>());
export const resetRecipesList = createAction('[Recipes] Reset recipes list');
export const setRecipeQuery = createAction('[Recipe] Set recipe query', props<{ slug: string }>());
export const setSelectedRecipe = createAction('[Recipe] Set selected recipe', props<{ recipe: any }>());
export const deleteRecipe = createAction('[Owner actions] Delete recipe', props<{ slug: string }>());

// REDUCERS
const tags = {
  For: { Закуска: false, Обяд: false, Вечеря: false },
  Meal: { Предястие: false, Основно: false, Десерт: false },
  Category: { Сосове: false, Гарнитури: false, Супи: false, Салати: false, Печива: false },
};
export const initalRecipesQueryState: RecipeQuery = {
  page: 1,
  limit: 20,
  country: '',
  sort: 'createdAt',
  order: -1,
  owner: '',
  tags,
};
export const initialRecipesStatsState: RecipeStats = { total: 0, count: 0, limit: 20, page: 0, pageCount: 0 };
export const initialRecipesListState: Recipe[] = [];
export const initialRecipeQueryState: string = '';
export const initialSelectedRecipeState: Recipe | null = null;
export const recipesQueryReducer = createReducer(
  initalRecipesQueryState,
  on(resetRecipesQuery, () => initalRecipesQueryState),
  on(setRecipesQuery, (state, { recipesQuery }) => ({ ...state, ...recipesQuery }))
);
export const recipesStatsReducer = createReducer(
  initialRecipesStatsState,
  on(setRecipesStats, (state, { recipesStats }) => ({ ...state, ...recipesStats }))
);
export const recipesListReduces = createReducer(
  initialRecipesListState,
  on(setRecipesList, (_, { recipes }) => recipes),
  on(resetRecipesQuery, () => [])
);
export const recipeQueryReducer = createReducer(
  initialRecipeQueryState,
  on(setRecipeQuery, (_, { slug }) => slug)
);
export const recipeReducer = createReducer(
  initialSelectedRecipeState,
  on(setSelectedRecipe, (_, { recipe }) => recipe)
);

// SELECTORS
export const selectFeatureRecipesQuery = createFeatureSelector<RecipeQuery>('recipesQuery');
export const selectFeatureRecipesStats = createFeatureSelector<RecipeStats>('recipesStats');
export const selectFeatureRecipesList = createFeatureSelector<Recipe[]>('recipes');
export const selectFeatureRecipe = createFeatureSelector<any>('recipe');
export const selectRecipesList = createSelector(
  selectFeatureUser,
  selectFeatureRecipesList,
  (user: User, recipes: Recipe[]) => recipes.map((recipe) => ({ ...recipe, isOwner: recipe.owner?.id === user?.id }))
);
export const selectOwnRecipesQuery = createSelector(
  selectFeatureUser,
  selectFeatureRecipesQuery,
  (user: User, query: RecipeQuery) => ({ ...query, owner: user.id })
);
