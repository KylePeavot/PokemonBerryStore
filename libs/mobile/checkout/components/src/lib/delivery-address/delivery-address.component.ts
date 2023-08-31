import { Component, OnInit } from '@angular/core';
import { asInputCustomEvent } from '@pokemon-berry-store/mobile/util';
import { InputCustomEvent } from '@ionic/angular';
import { AddressStore } from './address-store.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	addressSelected,
	getAddresses,
	getDeliveryAddress,
} from '@pokemon-berry-store/mobile/cart/state';

@Component({
	selector: '	app-delivery-address',
	templateUrl: 'delivery-address.component.html',
	styleUrls: ['delivery-address.component.scss'],
	providers: [AddressStore],
})
export class DeliveryAddressComponent implements OnInit {
	protected readonly asInputCustomEvent = asInputCustomEvent;

	filteredAddresses$: Observable<string[]>;
	selectedAddress$: Observable<string | undefined>;
	isAddressModalOpen$: Observable<boolean>;

	constructor(
		private readonly addressStore: AddressStore,
		private readonly store: Store
	) {}

	ngOnInit() {
		this.store.select(getAddresses).subscribe((addresses) => {
			this.addressStore.loadAddresses(addresses);
		});

		this.store.select(getDeliveryAddress).subscribe((address) => {
			this.addressStore.loadDeliveryAddress(address);
		});

		this.filteredAddresses$ = this.addressStore.filteredAddresses$;
		this.selectedAddress$ = this.addressStore.deliveryAddress$;
		this.isAddressModalOpen$ = this.addressStore.isAddressModalOpen$;
	}

	openModal() {
		this.addressStore.loadIsAddressModalOpen(true);
	}

	closeModal() {
		this.addressStore.loadIsAddressModalOpen(false);
	}

	handleSearchTermChange({ detail }: InputCustomEvent) {
		this.addressStore.loadSearchTerm(detail.value ?? '');
	}

	handleAddressSelected(address: string) {
		this.store.dispatch(addressSelected({ address }));

		this.closeModal();
	}
}
