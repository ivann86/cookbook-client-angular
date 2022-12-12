import { createFeatureSelector } from '@ngrx/store';
import { ApiStatus } from '../shared/interfaces';

export const selectApiStatus = createFeatureSelector<ApiStatus>('apiStatus');
