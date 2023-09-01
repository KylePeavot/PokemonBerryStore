import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './orders.reducer';

export const getOrderFeatureState = createFeatureSelector<OrderState>('order');

export const getLatestOrder = createSelector(
	getOrderFeatureState,
	(state) => state.orders[state.orders.length - 1]
);
