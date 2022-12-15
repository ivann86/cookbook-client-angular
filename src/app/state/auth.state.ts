import { createAction, createFeatureSelector, createReducer, on, props } from '@ngrx/store';
import { AuthStatus, User } from '../shared/interfaces';

// ACTIONS
export const authenticate = createAction('[Auth] Authenticate user');
export const setAuthStatus = createAction('[Auth] Set Auth Status', props<{ status: AuthStatus }>());
export const setToken = createAction('[Auth] Set Token', props<{ token: string }>());
export const resetToken = createAction('[Auth] Reset Token');
export const setUser = createAction('[Auth] Set User', props<{ user: any }>());
export const resetUser = createAction('[Auth] Reset User');
export const logInUser = createAction('[Auth] Log in user', props<{ email: string; password: string }>());
export const logOutUser = createAction('[Auth] Log out user');
export const registerUser = createAction(
  '[Auth] Register user',
  props<{ email: string; firstName: string; lastName: string; password: string }>()
);

// REDUCERS
export const initialTokenState: string = '';
export const initialUserState: any = null;
export const authStatusReducer = createReducer(
  'pending',
  on(setAuthStatus, (state, { status }) => status)
);
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
export const selectAuthStatus = createFeatureSelector<AuthStatus>('authStatus');
export const selectFeatureToken = createFeatureSelector<string>('token');
export const selectFeatureUser = createFeatureSelector<any>('user');
