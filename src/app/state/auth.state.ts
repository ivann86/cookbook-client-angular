import {
  createAction,
  createFeatureSelector,
  createReducer,
  on,
  props,
} from '@ngrx/store';
import { AuthStatus } from '../shared/interfaces/user';

// ACTIONS
export const authenticate = createAction('[Auth] Authenticate user');
export const setAuthStatus = creteAction(
  '[Auth] Set Auth Status',
  props<{ status: AuthStatus }>()
);
export const setToken = createAction(
  '[Auth Service] Set Token',
  props<{ token: string }>()
);
export const resetToken = createAction('[Auth Service] Reset Token');
export const setUser = createAction(
  '[Auth Service] Set User',
  props<{ user: User }>()
);
export const resetUser = createAction('[Auth Service] Reset User');

// REDUCERS
export const initialTokenState: string = '';
export const initialUserState: User = null;
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
export const selectFeatureUser = createFeatureSelector<User>('user');
