import { Component, Input } from '@angular/core';
import { InputCustomEvent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
	BerryActions,
	BerryFilters,
	BerryState,
} from '@pokemon-berry-store/mobile/berries/state';
import { asInputCustomEvent } from '@pokemon-berry-store/mobile/util';

@Component({
	selector: 'app-berry-filters',
	templateUrl: './berry-filters.component.html',
	styleUrls: ['./berry-filters.component.scss'],
})
export class BerryFiltersComponent {
	protected readonly asInputCustomEvent = asInputCustomEvent;

	isFilterModalOpen = false;

	@Input()
	currentlyActiveFilters: BerryFilters;
	newFilters: Omit<BerryFilters, 'searchTerm'>;

	constructor(private store: Store<BerryState>) {}

	handleSearchTermChanged(event: InputCustomEvent) {
		this.store.dispatch(
			BerryActions.berriesSearchTermUpdated({
				searchTerm: event.detail.value ?? '',
			})
		);
	}

	handleOpenModal() {
		this.newFilters = {
			selectedFirmnessTypes: {
				...this.currentlyActiveFilters.selectedFirmnessTypes,
			},
			flavorPotencyRanges: {
				...this.currentlyActiveFilters.flavorPotencyRanges,
			},
		};

		this.isFilterModalOpen = true;
	}

	handleCancel() {
		this.isFilterModalOpen = false;
	}

	handleConfirm() {
		this.store.dispatch(
			BerryActions.berriesFilterUpdated({
				selectedFirmnessTypes: this.newFilters.selectedFirmnessTypes,
				flavorPotencyRanges: this.newFilters.flavorPotencyRanges,
			})
		);
		this.isFilterModalOpen = false;
	}
}
