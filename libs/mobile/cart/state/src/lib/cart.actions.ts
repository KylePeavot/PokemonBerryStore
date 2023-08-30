import { createAction, props } from '@ngrx/store';
import { BerryCartItem } from './cart.reducer';

export const loadAddresses = createAction('[Location Page] Load Locations');
export const loadAddressesSuccess = createAction(
	'[Addresses API] Addresses Loaded Success',
	props<{ addresses: string[] }>()
);

export const updateQuantityOfBerryInCart = createAction(
	'[Berry Checkout Summary] Update Quantity of Berry in Cart',
	props<{
		berryToUpdate: BerryCartItem;
		changeInQuantity: number;
	}>()
);
