import { createFeatureSelector } from '@ngrx/store';

export const selectError = createFeatureSelector<{ message: string }>('error');
