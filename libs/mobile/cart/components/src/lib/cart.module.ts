import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '@pokemon-berry-store/mobile/cart/state';
import { AddToCartCounterComponent } from './add-to-cart-counter/add-to-cart-counter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CheckoutFooterComponent } from './checkout-footer/checkout-footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('cart', cartReducer),
		IonicModule,
		FormsModule,
		RouterLink,
	],
	declarations: [AddToCartCounterComponent, CheckoutFooterComponent],
	exports: [AddToCartCounterComponent, CheckoutFooterComponent],
})
export class CartModule {}
