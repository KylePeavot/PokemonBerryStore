import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import {
	addressSelected,
	deliveryDateSelected,
	loadAddressesSuccess,
	resetCart,
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

const initialState: CartState = {
	cart: {
		berries: [],
		numberOfBerries: 0,
		totalValueInPence: 0,
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

export const getDeliveryAddress = createSelector(
	getCartFeatureState,
	(state: CartState) => state.deliveryAddress
);

export const getDeliveryDate = createSelector(
	getCartFeatureState,
	(state: CartState) => state.deliveryDate
);

export const isCartValid = createSelector(
	getCart,
	getDeliveryAddress,
	getDeliveryDate,
	(cart, deliveryAddress, deliveryDate) => {
		return (
			cart.numberOfBerries > 0 &&
			deliveryAddress !== '' &&
			deliveryDate > new Date()
		);
	}
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
	}),
	on(addressSelected, (state, { address }): CartState => {
		return {
			...state,
			deliveryAddress: address,
		};
	}),
	on(deliveryDateSelected, (state, { deliveryDate }): CartState => {
		return {
			...state,
			deliveryDate,
		};
	}),
	on(resetCart, (state): CartState => {
		return {
			...initialState,
			deliveryAddress: state.deliveryAddress,
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
