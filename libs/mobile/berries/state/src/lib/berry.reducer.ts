import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import { berriesFilterUpdated, loadBerriesSuccess } from './berry.actions';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';

export interface BerryState {
	unfilteredBerries: Berry[];
	filteredBerries: Berry[];
}

const initialState: BerryState = {
	unfilteredBerries: [],
	filteredBerries: [],
};

const getBerryFeatureState = createFeatureSelector<BerryState>('berries');

export const getBerries = createSelector(
	getBerryFeatureState,
	(state) => state.filteredBerries
);
export const berryReducer = createReducer<BerryState>(
	initialState,
	on(loadBerriesSuccess, (state, action): BerryState => {
		return {
			...state,
			unfilteredBerries: action.berryList.berries,
			filteredBerries: action.berryList.berries,
		};
	}),
	on(berriesFilterUpdated, (state, action): BerryState => {
		return {
			...state,
			filteredBerries: filterBerries(
				action.searchTerm,
				state.unfilteredBerries
			),
		};
	})
);

const filterBerries = (
	searchTerm: string | null,
	berries: Berry[]
): Berry[] => {
	if (!searchTerm) {
		return berries;
	}

	return berries.filter((berry) =>
		berry.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
};
