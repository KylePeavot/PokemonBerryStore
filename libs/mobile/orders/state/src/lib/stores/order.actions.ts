import { createAction, props } from '@ngrx/store';
import { CartState } from '@pokemon-berry-store/mobile/cart/state';
import { Order } from './orders.reducer';

export const placeOrder = createAction(
	'[Checkout] Place Order',
	props<{ cartData: Omit<CartState, 'addresses'> }>()
);

export const placeOrderSuccess = createAction(
	'[Checkout] Place Order Success',
	props<{ order: Order }>()
);
