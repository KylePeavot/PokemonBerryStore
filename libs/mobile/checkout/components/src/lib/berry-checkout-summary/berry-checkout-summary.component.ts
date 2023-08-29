import { Component, Input } from '@angular/core';
import {
	BerryCartItem,
	Cart,
	updateQuantityOfBerryInCart,
} from '@pokemon-berry-store/mobile/cart/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-berry-checkout-summary',
	templateUrl: './berry-checkout-summary.component.html',
	styleUrls: ['./berry-checkout-summary.component.scss'],
})
export class BerryCheckoutSummary {
	@Input() cart: Cart;

	constructor(private store: Store) {}

	handleBerryQuantityChanged(berryCartItem: BerryCartItem, $event: number) {
		const delta = $event - berryCartItem.quantity;

		this.store.dispatch(
			updateQuantityOfBerryInCart({
				berryToUpdate: berryCartItem,
				changeInQuantity: delta,
			})
		);
	}
}
