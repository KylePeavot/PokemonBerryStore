import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import {
	loadAddressesSuccess,
	updateQuantityOfBerryInCart,
} from './cart.actions';

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
	addresses: string[];
	deliveryAddress: string;
	deliveryDate: Date;
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
	addresses: [],
	deliveryAddress: '',
	deliveryDate: new Date(
		new Date(new Date().setDate(new Date().getDate() + 2)).setHours(8, 0, 0)
	),
};

export const getCartFeatureState = createFeatureSelector<CartState>('cart');

export const getCart = createSelector(
	getCartFeatureState,
	(state: CartState) => state.cart
);

export const getAddresses = createSelector(
	getCartFeatureState,
	(state: CartState) => state.addresses
);
export const cartReducer = createReducer<CartState>(
	initialState,
	on(
		updateQuantityOfBerryInCart,
		(state, { berryToUpdate, changeInQuantity }): CartState => {
			const newBerriesInCart = updateBerriesInCart(
				berryToUpdate,
				changeInQuantity,
				state.cart.berries
			);

			return {
				...state,
				cart: {
					...state.cart,
					berries: newBerriesInCart,
					numberOfBerries: getNumberOfBerriesInCart(newBerriesInCart),
					totalValueInPence:
						getTotalValueInPenceOfCart(newBerriesInCart),
				},
			};
		}
	),
	on(loadAddressesSuccess, (state, { addresses }): CartState => {
		return {
			...state,
			addresses,
		};
	})
);

const updateBerriesInCart = (
	berryToUpdate: BerryCartItem,
	changeInQuantity: number,
	berriesInCart: BerryCartItem[]
): BerryCartItem[] => {
	const possibleBerryInCart = berriesInCart.find(
		(berry) => berry.id === berryToUpdate.id
	);

	if (possibleBerryInCart) {
		berriesInCart = berriesInCart.map((berryInCart) => {
			if (berryInCart.id === berryToUpdate.id) {
				return {
					...berryInCart,
					quantity: berryInCart.quantity + changeInQuantity,
				};
			}
			return berryInCart;
		});
	} else {
		berriesInCart = [
			...berriesInCart,
			{
				...berryToUpdate,
				quantity: changeInQuantity,
			},
		];
	}

	return berriesInCart
		.filter((berryInCart) => berryInCart.quantity > 0)
		.sort((a, b) => a.id - b.id);
};

const getNumberOfBerriesInCart = (berriesInCart: BerryCartItem[]): number => {
	return berriesInCart.reduce(
		(total, berryInCart) => total + berryInCart.quantity,
		0
	);
};

const getTotalValueInPenceOfCart = (berriesInCart: BerryCartItem[]): number => {
	return berriesInCart.reduce(
		(total, berryInCart) =>
			total +
			berryInCart.quantity * berryInCart.individualBerryPriceInPence,
		0
	);
};
