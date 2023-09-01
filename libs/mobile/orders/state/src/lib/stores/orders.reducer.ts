import { Berry } from '@pokemon-berry-store/mobile/berries/domain';
import { createReducer, on } from '@ngrx/store';
import { placeOrderSuccess } from './order.actions';

export interface Order {
	id: number;
	berries: Berry[];
	deliveryAddress: string;
	deliveryDate: Date;
	totalValueInPence: number;
}

export interface OrderState {
	orders: Order[];
}

const initialState = {
	orders: [],
};

export const orderReducer = createReducer<OrderState>(
	initialState,
	on(placeOrderSuccess, (state, { order }) => {
		const newState = {
			...state,
			orders: [...state.orders, order],
		};

		console.log(newState);

		return newState;
	})
);
