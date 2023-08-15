import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BerryService } from '../berry.service';
import { map, mergeMap } from 'rxjs';
import * as BerryActions from './berry.actions';

@Injectable()
export class BerryEffects {
	constructor(
		private actions$: Actions,
		private berryService: BerryService
	) {}

	loadBerries$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(BerryActions.loadBerries),
			mergeMap(() =>
				this.berryService
					.getAllBerries()
					.pipe(
						map((berryList) =>
							BerryActions.loadBerriesSuccess({ berryList })
						)
					)
			)
		);
	});
}
