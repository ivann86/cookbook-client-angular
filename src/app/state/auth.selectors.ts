import { createFeatureSelector } from '@ngrx/store';

export const selectFeatureToken = createFeatureSelector<string>('token');
export const selectFeatureUser = createFeatureSelector<any>('user');
