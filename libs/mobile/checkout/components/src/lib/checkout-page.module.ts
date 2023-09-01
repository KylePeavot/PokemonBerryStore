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

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		SharedModule,
		CheckoutRoutingModule,
		StoreModule.forFeature('cart', cartReducer),
		EffectsModule.forFeature([CartEffects]),
	],
	declarations: [
		CheckoutShellPage,
		BerryCheckoutSummary,
		DeliveryAddressComponent,
	],
})
export class CheckoutPageModule {}
