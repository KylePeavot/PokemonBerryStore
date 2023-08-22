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
	constructor(private store: Store<BerryState>) {}

	handleSearchTermChanged(event: InputCustomEvent) {
		this.store.dispatch(
			BerryActions.berriesSearchTermUpdated({
				searchTerm: event.detail.value ?? null,
			})
		);
	}

	toggleModal() {
		this.isFilterModalOpen = !this.isFilterModalOpen;
	}
}
