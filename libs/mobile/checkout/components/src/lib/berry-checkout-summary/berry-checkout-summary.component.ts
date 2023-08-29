import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '@pokemon-berry-store/mobile/cart/state';

@Component({
	selector: 'app-berry-checkout-summary',
	templateUrl: './berry-checkout-summary.component.html',
	styleUrls: ['./berry-checkout-summary.component.scss'],
})
export class BerryCheckoutSummary implements OnInit {
	@Input() cart: Cart;

	ngOnInit() {
		console.log(this.cart);
	}
}
