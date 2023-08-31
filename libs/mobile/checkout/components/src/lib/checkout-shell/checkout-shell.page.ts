import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
	CartState,
	deliveryDateSelected,
	getAddresses,
	getCartFeatureState,
	loadAddresses,
} from '@pokemon-berry-store/mobile/cart/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-checkout-shell',
	templateUrl: 'checkout-shell.page.html',
	styleUrls: ['checkout-shell.page.scss'],
})
export class CheckoutShellPage implements OnInit {
	cart$: Observable<CartState>;
	addresses$: Observable<string[] | undefined>;

	constructor(private store: Store) {}

	ngOnInit() {
		this.cart$ = this.store.select(getCartFeatureState);
		this.addresses$ = this.store.select(getAddresses);

		this.store.dispatch(loadAddresses());
	}

	handleDeliveryDateChange($event: Date) {
		this.store.dispatch(
			deliveryDateSelected({
				deliveryDate: $event,
			})
		);
	}
}
