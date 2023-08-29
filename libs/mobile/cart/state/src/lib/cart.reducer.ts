import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import { addBerry } from './cart.actions';

export interface BerryCartItem {
	id: number;
	name: string;
	spriteUrl: string;
	individualBerryPriceInPence: number;
	quantity: number;
}

export interface Cart {
	berries: BerryCartItem[];
	numberOfBerries: number;
	totalValueInPence: number;
}

export interface CartState {
	cart: Cart;
}

// TODO: Remove this initial state
const initialState: CartState = {
	cart: {
		berries: [
			{
				id: 1,
				name: 'Cheri',
				spriteUrl:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png',
				individualBerryPriceInPence: 200,
				quantity: 3,
			},
			{
				id: 2,
				name: 'Chesto',
				spriteUrl:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png',
				individualBerryPriceInPence: 200,
				quantity: 2,
			},
			{
				id: 10,
				name: 'Sitrus',
				spriteUrl:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sitrus-berry.png',
				individualBerryPriceInPence: 800,
				quantity: 2,
			},
			{
				id: 11,
				name: 'Figy',
				spriteUrl:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/figy-berry.png',
				individualBerryPriceInPence: 300,
				quantity: 3,
			},
		],
		numberOfBerries: 10,
		totalValueInPence: 3500,
	},
};

export const getCartFeatureState = createFeatureSelector<CartState>('cart');

export const getCart = createSelector(
	getCartFeatureState,
	(state: CartState) => state.cart
);
export const cartReducer = createReducer<CartState>(
	initialState,
	on(addBerry, (state, { berryToAdd }): CartState => {
		return {
			...state,
			cart: {
				...state.cart,
				berries: addBerryToCart(berryToAdd, state.cart.berries),
				numberOfBerries:
					state.cart.numberOfBerries + berryToAdd.quantity,
				totalValueInPence:
					state.cart.totalValueInPence +
					berryToAdd.quantity *
						berryToAdd.individualBerryPriceInPence,
			},
		};
	})
);

const addBerryToCart = (
	berryToAdd: BerryCartItem,
	berriesInCart: BerryCartItem[]
): BerryCartItem[] => {
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

	return [...berriesInCart, { ...berryToAdd }].sort((a, b) =>
		a.id > b.id ? 1 : -1
	);
};
