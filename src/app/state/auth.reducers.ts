import { createReducer, on } from '@ngrx/store';
import { setToken, resetToken, setUser, resetUser } from './auth.actions';

export const initialTokenState: string = '';
export const initialUserState: any = null;

export const tokenReducer = createReducer(
  initialTokenState,
  on(setToken, (state, { token }) => token),
  on(resetToken, (): string => '')
);

export const userReducer = createReducer(
  initialUserState,
  on(setUser, (state, { user }) => user),
  on(resetUser, () => null)
);
