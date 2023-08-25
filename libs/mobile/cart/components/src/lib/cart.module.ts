import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '@pokemon-berry-store/mobile/berries/state';
import { AddToCartCounterComponent } from './add-to-cart-counter/add-to-cart-counter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		StoreModule.forFeature('cart', cartReducer),
		IonicModule,
		FormsModule,
	],
	declarations: [AddToCartCounterComponent],
	exports: [AddToCartCounterComponent],
})
export class CartModule {}
