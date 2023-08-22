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

export interface SelectedFirmnessTypes {
	isVerySoftSelected: boolean;
	isSoftSelected: boolean;
	isHardSelected: boolean;
	isVeryHardSelected: boolean;
	isSuperHardSelected: boolean;
}

export interface BerryFilters {
	searchTerm: string;
	selectedFirmnessTypes: SelectedFirmnessTypes;
}

const initialState: BerryState = {
	unfilteredBerries: [],
	filteredBerries: [],
	berryFilters: {
		searchTerm: '',
		selectedFirmnessTypes: {
			isVerySoftSelected: false,
			isSoftSelected: false,
			isHardSelected: false,
			isVeryHardSelected: false,
			isSuperHardSelected: false,
		},
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
			berryFilters: {
				...state.berryFilters,
				selectedFirmnessTypes: action.selectedFirmnessTypes,
			},
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
	const isNoFirmnessSelected: boolean = Object.values(
		selectedFirmnessTypes
	).every((isFirmnessSelected) => !isFirmnessSelected);

	const isFirmnessSelected = (firmness: BerryFirmness): boolean => {
		switch (firmness) {
			case 'very-soft':
				return selectedFirmnessTypes.isVerySoftSelected;
			case 'soft':
				return selectedFirmnessTypes.isSoftSelected;
			case 'hard':
				return selectedFirmnessTypes.isHardSelected;
			case 'very-hard':
				return selectedFirmnessTypes.isVeryHardSelected;
			case 'super-hard':
				return selectedFirmnessTypes.isSuperHardSelected;
		}
	};

	return berries.filter((berry) => {
		const doesNameMatchSearchTerm = berry.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		return (
			doesNameMatchSearchTerm &&
			(isNoFirmnessSelected || isFirmnessSelected(berry.firmness))
		);
	});
};
