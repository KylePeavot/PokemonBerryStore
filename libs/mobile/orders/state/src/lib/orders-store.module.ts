import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { orderReducer } from './stores/orders.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './stores/order.effects';

@NgModule({
	imports: [
		StoreModule.forFeature('order', orderReducer),
		EffectsModule.forFeature(OrderEffects),
	],
})
export class OrdersStoreModule {}
