import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
	Cart,
	getAddresses,
	getCart,
	loadAddresses,
} from '@pokemon-berry-store/mobile/cart/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-checkout-shell',
	templateUrl: 'checkout-shell.page.html',
	styleUrls: ['checkout-shell.page.scss'],
})
export class CheckoutShellPage implements OnInit {
	cart$: Observable<Cart>;
	addresses$: Observable<string[] | undefined>;

	constructor(private store: Store) {}

	ngOnInit() {
		this.cart$ = this.store.select(getCart);
		this.addresses$ = this.store.select(getAddresses);

		this.store.dispatch(loadAddresses());
	}
}
