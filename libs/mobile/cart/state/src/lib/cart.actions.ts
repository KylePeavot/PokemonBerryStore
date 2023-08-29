import { createAction, props } from '@ngrx/store';
import { BerryCartItem } from './cart.reducer';

export const updateQuantityOfBerryInCart = createAction(
	'[Berry Checkout Summary] Update Quantity of Berry in Cart',
	props<{
		berryToUpdate: BerryCartItem;
		changeInQuantity: number;
	}>()
);
