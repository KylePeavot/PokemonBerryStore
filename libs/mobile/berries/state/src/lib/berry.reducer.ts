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

export interface FlavorPotencyRanges {
	spicy: { lower: number; upper: number };
	dry: { lower: number; upper: number };
	sweet: { lower: number; upper: number };
	bitter: { lower: number; upper: number };
	sour: { lower: number; upper: number };
}

export interface BerryFilters {
	searchTerm: string;
	selectedFirmnessTypes: SelectedFirmnessTypes;
	flavorPotencyRanges: FlavorPotencyRanges;
}

const initialState: BerryState = {
	unfilteredBerries: [],
	//TODO: Move to a selector
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
		flavorPotencyRanges: {
			spicy: { lower: 0, upper: 45 },
			dry: { lower: 0, upper: 45 },
			sweet: { lower: 0, upper: 45 },
			bitter: { lower: 0, upper: 45 },
			sour: { lower: 0, upper: 45 },
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
			berryFilters: {
				...state.berryFilters,
				searchTerm: action.searchTerm,
			},
			filteredBerries: filterBerries(
				{
					...state.berryFilters,
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
				flavorPotencyRanges: action.flavorPotencyRanges,
			},
			filteredBerries: filterBerries(
				{
					searchTerm: state.berryFilters.searchTerm,
					flavorPotencyRanges: action.flavorPotencyRanges,
					selectedFirmnessTypes: action.selectedFirmnessTypes,
				},
				state.unfilteredBerries
			),
		};
	})
);

const filterBerries = (
	{ searchTerm, selectedFirmnessTypes, flavorPotencyRanges }: BerryFilters,
	berries: Berry[]
): Berry[] => {
	return berries.filter(
		(berry) =>
			doesNameMatchSearchFilter(berry, searchTerm) &&
			doesFirmnessMatchFilterOrIsFilterEmpty(
				berry,
				selectedFirmnessTypes
			) &&
			isPotencyWithinRangeFilter(berry, flavorPotencyRanges)
	);
};

const doesNameMatchSearchFilter = (
	berry: Berry,
	searchTerm: string
): boolean => {
	return berry.name.toLowerCase().includes(searchTerm.toLowerCase());
};

const doesFirmnessMatchFilterOrIsFilterEmpty = (
	berry: Berry,
	selectedFirmnessTypes: SelectedFirmnessTypes
): boolean => {
	const isNoFirmnessSelected: boolean = Object.values(
		selectedFirmnessTypes
	).every((isFirmnessSelected) => !isFirmnessSelected);

	if (isNoFirmnessSelected) {
		return true;
	}

	switch (berry.firmness) {
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

const isPotencyWithinRangeFilter = (
	berry: Berry,
	flavorPotencyRanges: FlavorPotencyRanges
): boolean => {
	const isPotencyWithinRange = (
		potency: number,
		range: { lower: number; upper: number }
	): boolean => {
		return potency >= range.lower && potency <= range.upper;
	};

	return (
		isPotencyWithinRange(
			berry.flavorPotencyMap.spicy,
			flavorPotencyRanges.spicy
		) &&
		isPotencyWithinRange(
			berry.flavorPotencyMap.dry,
			flavorPotencyRanges.dry
		) &&
		isPotencyWithinRange(
			berry.flavorPotencyMap.sweet,
			flavorPotencyRanges.sweet
		) &&
		isPotencyWithinRange(
			berry.flavorPotencyMap.bitter,
			flavorPotencyRanges.bitter
		) &&
		isPotencyWithinRange(
			berry.flavorPotencyMap.sour,
			flavorPotencyRanges.sour
		)
	);
};
