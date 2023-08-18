import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { loadBerries, loadBerriesSuccess } from './berry.actions';
import { BerryService } from '@pokemon-berry-store/mobile/berries/services';

@Injectable()
export class BerryEffects {
	constructor(
		private actions$: Actions,
		private berryService: BerryService
	) {}

	loadBerries$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadBerries),
			mergeMap(() =>
				this.berryService
					.getAllBerries()
					.pipe(map((berryList) => loadBerriesSuccess({ berryList })))
			)
		);
	});
}
