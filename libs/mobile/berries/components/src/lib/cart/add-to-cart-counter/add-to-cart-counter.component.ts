import { Component, Input } from '@angular/core';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';
import { Store } from '@ngrx/store';
import { addBerry, CartState } from '@pokemon-berry-store/mobile/berries/state';

@Component({
	selector: 'app-add-to-cart-counter',
	templateUrl: './add-to-cart-counter.component.html',
	styleUrls: ['./add-to-cart-counter.component.scss'],
})
export class AddToCartCounterComponent {
	@Input()
	berry: Berry;
	quantity = 1;

	constructor(private store: Store<CartState>) {}

	incrementQuantity() {
		this.quantity++;
	}

	decrementQuantity() {
		if (this.quantity === 0) {
			return;
		}

		this.quantity--;
	}

	handleAddToCart() {
		if (this.quantity === 0) {
			return;
		}

		this.store.dispatch(
			addBerry({
				berryToAdd: {
					id: this.berry.id,
					name: this.berry.name,
					quantity: this.quantity,
					individualBerryPriceInPence: this.berry.priceInPence,
				},
			})
		);

		this.quantity = 1;
	}
}
