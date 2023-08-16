import { createAction, props } from '@ngrx/store';
import { BerryList } from '../berry.service';

export const loadBerries = createAction('[Berry Page] Load Berries');

export const loadBerriesSuccess = createAction(
	'[Berry API] Berries Loaded Success',
	props<{ berryList: BerryList }>()
);

export const berriesFilterUpdated = createAction(
	'[Berry Page] Berries Filter Updated',
	props<{ searchTerm: string | null }>()
);
