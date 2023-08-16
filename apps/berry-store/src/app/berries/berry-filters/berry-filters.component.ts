import { Component } from '@angular/core';
import { InputCustomEvent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { berriesFilterUpdated } from '../state/berry.actions';
import { asInputCustomEventOrThrow } from '../../utils/ionic-type-checks';

@Component({
	selector: 'app-berry-filters',
	templateUrl: './berry-filters.component.html',
	styleUrls: ['./berry-filters.component.scss'],
})
export class BerryFiltersComponent {
	constructor(private store: Store<State>) {}

	handleSearchTermChanged(event: InputCustomEvent) {
		this.store.dispatch(
			berriesFilterUpdated({ searchTerm: event.detail.value ?? null })
		);
	}

	protected readonly asInputCustomEventOrThrow = asInputCustomEventOrThrow;
}
