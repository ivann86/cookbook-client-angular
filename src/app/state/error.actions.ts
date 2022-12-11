import { createAction, props } from '@ngrx/store';

export const setError = createAction('[Error] Set error', props<{ message: string }>());
export const resetError = createAction('[Error] Reset error');
