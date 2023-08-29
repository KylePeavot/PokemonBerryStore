import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-add-to-cart-counter',
	templateUrl: './add-to-cart-counter.component.html',
	styleUrls: ['./add-to-cart-counter.component.scss'],
})
export class AddToCartCounterComponent {
	@Output()
	addToCartClicked = new EventEmitter<number>();

	quantity = 1;

	handleAddToCartClicked() {
		if (this.quantity === 0) {
			return;
		}

		this.addToCartClicked.emit(this.quantity);

		this.quantity = 1;
	}
}
