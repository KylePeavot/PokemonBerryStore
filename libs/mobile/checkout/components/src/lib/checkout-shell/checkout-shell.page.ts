import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
	CartState,
	deliveryDateSelected,
	getAddresses,
	getCartFeatureState,
	isCartValid,
	loadAddresses,
	resetCart,
} from '@pokemon-berry-store/mobile/cart/state';
import { Store } from '@ngrx/store';
import { placeOrder } from '@pokemon-berry-store/mobile/orders/state';
import { Router } from '@angular/router';

@Component({
	selector: 'app-checkout-shell',
	templateUrl: 'checkout-shell.page.html',
	styleUrls: ['checkout-shell.page.scss'],
})
export class CheckoutShellPage implements OnInit {
	cart$: Observable<CartState>;
	addresses$: Observable<string[] | undefined>;
	isCartValid$: Observable<boolean>;

	constructor(private store: Store, private router: Router) {}

	ngOnInit() {
		this.cart$ = this.store.select(getCartFeatureState);
		this.addresses$ = this.store.select(getAddresses);
		this.isCartValid$ = this.store.select(isCartValid);

		this.store.dispatch(loadAddresses());
	}

	handleDeliveryDateChange($event: Date) {
		this.store.dispatch(
			deliveryDateSelected({
				deliveryDate: $event,
			})
		);
	}

	handleCheckout({ deliveryDate, deliveryAddress, cart }: CartState) {
		this.store.dispatch(
			placeOrder({
				cartData: {
					cart,
					deliveryAddress,
					deliveryDate,
				},
			})
		);

		this.store.dispatch(resetCart());

		this.router.navigate(['/']);
	}
}
