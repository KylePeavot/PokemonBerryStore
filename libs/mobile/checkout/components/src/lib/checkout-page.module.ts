import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutShellPage } from './checkout-shell/checkout-shell.page';
import { SharedModule } from '@pokemon-berry-store/mobile/shared/components';
import { BerryCheckoutSummary } from './berry-checkout-summary/berry-checkout-summary.component';
import { StoreModule } from '@ngrx/store';
import {
	CartEffects,
	cartReducer,
} from '@pokemon-berry-store/mobile/cart/state';
import { EffectsModule } from '@ngrx/effects';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { OrdersStoreModule } from '@pokemon-berry-store/mobile/orders/state';

@NgModule({
	declarations: [
		CheckoutShellPage,
		BerryCheckoutSummary,
		DeliveryAddressComponent,
	],
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		SharedModule,
		CheckoutRoutingModule,
		OrdersStoreModule,
		StoreModule.forFeature('cart', cartReducer),
		EffectsModule.forFeature([CartEffects]),
	],
})
export class CheckoutPageModule {}
