import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BerriesPageRoutingModule } from './berries-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
	BerriesShellPage,
	BerryFiltersComponent,
	BerryListComponent,
} from '@pokemon-berry-store/mobile/berries/components';
import {
	BerryEffects,
	berryReducer,
} from '@pokemon-berry-store/mobile/berries/state';
import { BerryFlavorBarComponent } from './berry-flavor-bar/berry-flavor-bar.component';
import { CartModule } from '@pokemon-berry-store/mobile/cart/components';
import { SharedModule } from '@pokemon-berry-store/mobile/shared/components';
import { OrderConfirmationToastComponent } from './order-confirmation-toast/order-confirmation-toast.component';
import { OrdersStoreModule } from '@pokemon-berry-store/mobile/orders/state';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BerriesPageRoutingModule,
		OrdersStoreModule,
		StoreModule.forFeature('berries', berryReducer),
		EffectsModule.forFeature([BerryEffects]),
		CartModule,
		SharedModule,
	],
	declarations: [
		BerriesShellPage,
		BerryListComponent,
		BerryFiltersComponent,
		BerryFlavorBarComponent,
		OrderConfirmationToastComponent,
	],
})
export class BerriesModule {}
