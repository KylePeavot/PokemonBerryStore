import { createAction, props } from '@ngrx/store';
import { BerryCartItem } from './cart.reducer';

export const addBerry = createAction(
	'[Berry Page] Add Berry',
	props<{ berryToAdd: BerryCartItem }>()
);
