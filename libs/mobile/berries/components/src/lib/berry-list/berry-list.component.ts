import { Component, Input } from '@angular/core';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';
import { Store } from '@ngrx/store';
import { addBerry } from '@pokemon-berry-store/mobile/berries/state';

@Component({
	selector: 'app-berry-list',
	templateUrl: './berry-list.component.html',
	styleUrls: ['./berry-list.component.scss'],
})
export class BerryListComponent {
	@Input() berries: Berry[];

	constructor(private store: Store) {}

	handleAddItemClicked($event: number, berry: Berry) {
		this.store.dispatch(
			addBerry({
				berryToAdd: {
					id: berry.id,
					name: berry.name,
					individualBerryPriceInPence: berry.priceInPence,
					quantity: $event,
				},
			})
		);
	}
}
