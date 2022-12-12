import { createAction, props } from '@ngrx/store';
import { ApiStatus } from '../shared/interfaces';

export const setApiStatus = createAction('[API] Set status', props<{ apiStatus: ApiStatus }>());
export const resetApiStatus = createAction('[API] Reset status');
