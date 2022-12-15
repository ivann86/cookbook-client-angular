import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { Recipe, RecipeQuery, RecipeSample, RecipeStats, User } from '../shared/interfaces';
import { selectFeatureUser } from './auth.state';

// ACTIONS
export const getRecipesSamples = createAction(
  '[Samples] Get recipes samples',
  props<{ name: string; tags: string[]; count: number }>()
);
export const setRecipesSamples = createAction(
  '[Samples] Set recipes samples',
  props<{ sample: { name: string; recipes: Recipe[] } }>()
);
export const resetRecipeSamples = createAction('[Samples] Reset recipe samples');
export const setRecipesQuery = createAction('[Recipes] Set recipes query', props<{ recipesQuery: RecipeQuery }>());
export const resetRecipesQuery = createAction('[Recipes] Reset recipes query');
export const setRecipesStats = createAction('[Recipes] Set recipes stats', props<{ recipesStats: RecipeStats }>());
export const setRecipesList = createAction('[Recipes] Set recipes list', props<{ recipes: Recipe[] }>());
export const resetRecipesList = createAction('[Recipes] Reset recipes list');
export const setRecipeQuery = createAction('[Recipe] Set recipe query', props<{ slug: string }>());
export const setSelectedRecipe = createAction('[Recipe] Set selected recipe', props<{ recipe: any }>());
export const deleteRecipe = createAction('[Owner actions] Delete recipe', props<{ slug: string }>());
export const addRecipe = createAction('[Add page] Add a recipe', props<{ recipe: Recipe; image?: File }>());
export const editRecipe = createAction(
  '[Edit page] Edit a recipe',
  props<{ slug: string; recipe: Recipe; image?: File }>()
);

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
export const recipesSampleReducer = createReducer(
  [] as any,
  on(setRecipesSamples, (state, { sample }) => [...state, sample]),
  on(resetRecipeSamples, () => [])
);
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
export const selectRecipesSamples = createFeatureSelector<RecipeSample[]>('samples');
export const selectFeatureRecipesQuery = createFeatureSelector<RecipeQuery>('recipesQuery');
export const selectFeatureRecipesStats = createFeatureSelector<RecipeStats>('recipesStats');
export const selectFeatureRecipesList = createFeatureSelector<Recipe[]>('recipes');
export const selectFeatureRecipe = createFeatureSelector<Recipe>('recipe');
export const selectRecipe = createSelector(selectFeatureUser, selectFeatureRecipe, (user: User, recipe: Recipe) => ({
  ...recipe,
  isOwner: recipe.owner?.id === user?.id,
}));
export const selectRecipesList = createSelector(
  selectFeatureUser,
  selectFeatureRecipesList,
  (user: User, recipes: Recipe[]) => recipes.map((recipe) => ({ ...recipe, isOwner: recipe.owner?.id === user?.id }))
);
