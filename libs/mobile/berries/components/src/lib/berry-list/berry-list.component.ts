import { Component, Input } from '@angular/core';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';
import { Store } from '@ngrx/store';
import { updateQuantityOfBerryInCart } from '@pokemon-berry-store/mobile/cart/state';

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
			updateQuantityOfBerryInCart({
				berryToUpdate: {
					id: berry.id,
					name: berry.prettyPrintName(),
					spriteUrl: berry.spriteUrl,
					individualBerryPriceInPence: berry.priceInPence,
					quantity: $event,
				},
				changeInQuantity: $event,
			})
		);
	}
}
