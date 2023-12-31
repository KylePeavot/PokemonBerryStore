import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface AddressState {
	addresses: string[];
	searchTerm: string;
	deliveryAddress: string | undefined;
	isAddressModalOpen: boolean;
}

const initialState: AddressState = {
	addresses: [],
	searchTerm: '',
	deliveryAddress: undefined,
	isAddressModalOpen: false,
};

@Injectable()
export class AddressStore extends ComponentStore<AddressState> {
	constructor() {
		super(initialState);
	}

	private readonly addresses$ = this.select((state) => state.addresses);
	private readonly searchTerm$ = this.select((state) => state.searchTerm);

	readonly filteredAddresses$ = this.select(
		this.addresses$,
		this.searchTerm$,
		(addresses, searchTerm) =>
			addresses.filter((address) =>
				address.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);
	readonly deliveryAddress$ = this.select((state) => state.deliveryAddress);
	readonly isAddressModalOpen$ = this.select(
		(state) => state.isAddressModalOpen
	);

	readonly loadAddresses = this.updater((state, addresses: string[]) => ({
		...state,
		addresses,
	}));

	readonly loadSearchTerm = this.updater((state, searchTerm: string) => ({
		...state,
		searchTerm,
	}));

	readonly loadDeliveryAddress = this.updater(
		(state, deliveryAddress: string) => ({
			...state,
			deliveryAddress,
		})
	);

	readonly loadIsAddressModalOpen = this.updater(
		(state, isAddressModalOpen: boolean) => ({
			...state,
			isAddressModalOpen,
		})
	);
}
