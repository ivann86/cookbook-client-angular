import { createAction, createFeatureSelector, createReducer, on, props } from '@ngrx/store';
import { ApiStatus } from '../shared/interfaces';

// ACTIONS
export const setApiStatus = createAction('[API] Set status', props<{ apiStatus: ApiStatus }>());
export const resetApiStatus = createAction('[API] Reset status');

// REDUCER
const initialApiStatus: ApiStatus = { status: 'idle', message: '' };
export const apiStatusReducer = createReducer(
  initialApiStatus,
  on(setApiStatus, (state, { apiStatus }) => ({ ...apiStatus })),
  on(resetApiStatus, () => initialApiStatus)
);

// SELECTOR
export const selectApiStatus = createFeatureSelector<ApiStatus>('apiStatus');
