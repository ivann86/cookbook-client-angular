import { createReducer, on } from '@ngrx/store';
import { ApiStatus } from '../shared/interfaces';
import { resetApiStatus, setApiStatus } from './api.actions';

const initialApiStatus: ApiStatus = { status: 'idle', message: '' };

export const apiStatusReducer = createReducer(
  initialApiStatus,
  on(setApiStatus, (state, { apiStatus }) => ({ ...apiStatus })),
  on(resetApiStatus, () => initialApiStatus)
);
