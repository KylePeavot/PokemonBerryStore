import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-counter',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
	@Input() allowNonPositive = false;

	@Input() quantity = 1;
	@Output() quantityChange = new EventEmitter<number>();

	incrementQuantity() {
		this.quantity++;
		this.quantityChange.emit(this.quantity);
	}

	decrementQuantity() {
		if (this.quantity === 1 && !this.allowNonPositive) {
			return;
		}

		this.quantity--;

		this.quantityChange.emit(this.quantity);
	}

	handleInputUnfocused() {
		this.quantityChange.emit(this.quantity);
	}
}
