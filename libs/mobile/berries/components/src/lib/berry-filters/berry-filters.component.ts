import { Component } from '@angular/core';
import { InputCustomEvent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
	BerryActions,
	BerryState,
} from '@pokemon-berry-store/mobile/berries/state';
import { asInputCustomEventOrThrow } from '@pokemon-berry-store/mobile/util';

@Component({
	selector: 'app-berry-filters',
	templateUrl: './berry-filters.component.html',
	styleUrls: ['./berry-filters.component.scss'],
})
export class BerryFiltersComponent {
	//INFO: Angular needs this to
	protected readonly asInputCustomEventOrThrow = asInputCustomEventOrThrow;

	constructor(private store: Store<BerryState>) {}

	handleSearchTermChanged(event: InputCustomEvent) {
		this.store.dispatch(
			BerryActions.berriesFilterUpdated({
				searchTerm: event.detail.value ?? null,
			})
		);
	}
}
