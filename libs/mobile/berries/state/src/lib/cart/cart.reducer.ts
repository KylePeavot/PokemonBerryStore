import { createReducer, on } from '@ngrx/store';
import { addBerry } from './cart.actions';

export interface BerryCartItem {
	id: number;
	name: string;
	quantity: number;
	individualBerryPriceInPence: number;
}

export interface CartState {
	cart: {
		berries: BerryCartItem[];
	};
}

const initialState: CartState = {
	cart: {
		berries: [],
	},
};

export const cartReducer = createReducer<CartState>(
	initialState,
	on(addBerry, (state, { berryToAdd }): CartState => {
		const newState = {
			...state,
			cart: {
				...state.cart,
				berries: addBerryToCart(berryToAdd, state.cart.berries),
			},
		};

		console.log('The cart now contains:', newState.cart);

		return newState;
	})
);

const addBerryToCart = (
	berryToAdd: BerryCartItem,
	berriesInCart: BerryCartItem[]
) => {
	const berryAlreadyInCart = berriesInCart.find(
		(berry) => berry.id === berryToAdd.id
	);

	if (berryAlreadyInCart) {
		return berriesInCart.map((berry) =>
			berry.id === berryToAdd.id
				? { ...berry, quantity: berry.quantity + berryToAdd.quantity }
				: berry
		);
	}

	return [...berriesInCart, berryToAdd].sort((a, b) =>
		a.id > b.id ? 1 : -1
	);
};
