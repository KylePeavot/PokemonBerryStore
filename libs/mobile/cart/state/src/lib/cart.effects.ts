import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadAddresses, loadAddressesSuccess } from './cart.actions';
import { map, mergeMap } from 'rxjs';
import { LocationService } from '@pokemon-berry-store/mobile/checkout/services';

@Injectable()
export class CartEffects {
	constructor(
		private actions$: Actions,
		private locationService: LocationService
	) {}

	loadLocations$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadAddresses),
			mergeMap(() =>
				this.locationService
					.getAllLocations()
					.pipe(
						map((locations) =>
							loadAddressesSuccess({ addresses: locations })
						)
					)
			)
		);
	});
}
