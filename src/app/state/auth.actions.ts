import { createAction, props } from '@ngrx/store';

export const setToken = createAction('[Auth Service] Set Token', props<{ token: string }>());
export const resetToken = createAction('[Auth Service] Reset Token');

export const setUser = createAction('[Auth Service] Set User', props<{ user: any }>());
export const resetUser = createAction('[Auth Service] Reset User');
