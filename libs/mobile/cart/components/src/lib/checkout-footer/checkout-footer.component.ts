import { Component, Input } from '@angular/core';
import { Cart } from '@pokemon-berry-store/mobile/cart/state';

@Component({
	selector: 'app-checkout-footer',
	templateUrl: './checkout-footer.component.html',
	styleUrls: ['./checkout-footer.component.scss'],
})
export class CheckoutFooterComponent {
	@Input() cart: Cart;
}
