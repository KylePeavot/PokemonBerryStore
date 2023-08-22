import { createAction, props } from '@ngrx/store';
import { BerryList } from '@pokemon-berry-store/mobile/berries/services';
import { SelectedFirmnessTypes } from './berry.reducer';

export const loadBerries = createAction('[Berry Page] Load Berries');

export const loadBerriesSuccess = createAction(
	'[Berry API] Berries Loaded Success',
	props<{ berryList: BerryList }>()
);

export const berriesSearchTermUpdated = createAction(
	'[Berry Page] Berries Search Term Updated',
	props<{ searchTerm: string }>()
);

export const berriesFilterUpdated = createAction(
	'[Berry Page] Berries Filter Updated',
	props<{ selectedFirmnessTypes: SelectedFirmnessTypes }>()
);
