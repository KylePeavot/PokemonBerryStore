import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, getCart } from '@pokemon-berry-store/mobile/cart/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-checkout-shell',
	templateUrl: 'checkout-shell.page.html',
	styleUrls: ['checkout-shell.page.scss'],
})
export class CheckoutShellPage {
	cart$: Observable<Cart>;

	constructor(private store: Store) {
		this.cart$ = this.store.select(getCart);
	}
}
