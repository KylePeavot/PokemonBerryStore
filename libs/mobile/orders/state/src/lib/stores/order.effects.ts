import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { placeOrder, placeOrderSuccess } from './order.actions';
import { Store } from '@ngrx/store';
import { getUnfilteredBerries } from '@pokemon-berry-store/mobile/berries/state';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';

@Injectable()
export class OrderEffects {
	constructor(private actions$: Actions, private store$: Store) {}

	placeOrder$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(placeOrder),
			concatLatestFrom(() => [this.store$.select(getUnfilteredBerries)]),
			map(([{ cartData }, berries]) => {
				return placeOrderSuccess({
					order: {
						id: Math.floor(Math.random() * 1000),
						berries: cartData.cart.berries.map(
							(berry) =>
								//casting because there should always be a berry with the same id
								berries.find((b) => b.id === berry.id) as Berry
						),
						deliveryAddress: cartData.deliveryAddress,
						deliveryDate: cartData.deliveryDate,
						totalValueInPence: cartData.cart.totalValueInPence,
					},
				});
			})
		);
	});
}
