import { createAction, createFeatureSelector, createReducer, on, props } from '@ngrx/store';

// ACTIONS
export const setToken = createAction('[Auth Service] Set Token', props<{ token: string }>());
export const resetToken = createAction('[Auth Service] Reset Token');
export const setUser = createAction('[Auth Service] Set User', props<{ user: any }>());
export const resetUser = createAction('[Auth Service] Reset User');

// REDUCERS
export const initialTokenState: string = '';
export const initialUserState: any = null;
export const tokenReducer = createReducer(
  initialTokenState,
  on(setToken, (_, { token }) => token),
  on(resetToken, (): string => '')
);
export const userReducer = createReducer(
  initialUserState,
  on(setUser, (_, { user }) => user),
  on(resetUser, () => null)
);

// SELECTORS
export const selectFeatureToken = createFeatureSelector<string>('token');
export const selectFeatureUser = createFeatureSelector<any>('user');
