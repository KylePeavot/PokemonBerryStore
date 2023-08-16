import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import * as BerryActions from './berry.actions';

export interface BerryState {
	berriesResults: {
		count: number;
		berries: {
			id: number;
			name: string;
			spriteUrl: string | null;
		}[];
	};
}

const initialState: BerryState = {
	berriesResults: {
		count: 0,
		berries: [],
	},
};

const getBerryFeatureState = createFeatureSelector<BerryState>('berries');

export const getBerries = createSelector(
	getBerryFeatureState,
	(state) => state.berriesResults
);
export const berryReducer = createReducer<BerryState>(
	initialState,
	on(BerryActions.loadBerriesSuccess, (state, action): BerryState => {
		return {
			...state,
			berriesResults: action.berryList,
		};
	})
);
