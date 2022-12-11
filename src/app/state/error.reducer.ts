import { createReducer, on } from '@ngrx/store';
import { resetError, setError } from './error.actions';

const initialErrorState = { message: '' };

export const errorReducer = createReducer(
  initialErrorState,
  on(setError, (state, { message }) => ({ message })),
  on(resetError, () => initialErrorState)
);
