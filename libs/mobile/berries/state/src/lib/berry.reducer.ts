import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import {
	berriesFilterUpdated,
	berriesSearchTermUpdated,
	loadBerriesSuccess,
} from './berry.actions';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';
import { BerryFirmness } from '@pokemon-berry-store/shared/request-types';

export interface BerryState {
	unfilteredBerries: Berry[];
	filteredBerries: Berry[];
	berryFilters: BerryFilters;
}

export interface BerryFilters {
	searchTerm: string | null;
	selectedFirmnessTypes: BerryFirmness[];
}

const initialState: BerryState = {
	unfilteredBerries: [],
	filteredBerries: [],
	berryFilters: {
		searchTerm: null,
		selectedFirmnessTypes: [],
	},
};

const getBerryFeatureState = createFeatureSelector<BerryState>('berries');

export const getBerries = createSelector(
	getBerryFeatureState,
	(state) => state.filteredBerries
);

export const getBerriesFilters = createSelector(
	getBerryFeatureState,
	(state) => state.berryFilters
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
	on(berriesSearchTermUpdated, (state, action): BerryState => {
		return {
			...state,
			filteredBerries: filterBerries(
				{
					selectedFirmnessTypes:
						state.berryFilters.selectedFirmnessTypes,
					searchTerm: action.searchTerm,
				},
				state.unfilteredBerries
			),
		};
	}),
	on(berriesFilterUpdated, (state, action): BerryState => {
		return {
			...state,
			filteredBerries: filterBerries(
				{
					searchTerm: state.berryFilters.searchTerm,
					selectedFirmnessTypes: action.selectedFirmnessTypes,
				},
				state.unfilteredBerries
			),
		};
	})
);

const filterBerries = (
	{ searchTerm, selectedFirmnessTypes }: BerryFilters,
	berries: Berry[]
): Berry[] => {
	if (!searchTerm) {
		return berries;
	}

	return berries.filter((berry) => {
		const doesNameMatchSearchTerm = berry.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		const isFirmnessSelectedOrNothingSelected = selectedFirmnessTypes.length
			? selectedFirmnessTypes.includes(berry.firmness)
			: true;

		return doesNameMatchSearchTerm && isFirmnessSelectedOrNothingSelected;
	});
};
