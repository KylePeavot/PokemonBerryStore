import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	BerryActions,
	BerryFilters,
	getBerries,
	getBerriesFilters,
} from '@pokemon-berry-store/mobile/berries/state';
import { Observable } from 'rxjs';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';
import { Cart, getCart } from '@pokemon-berry-store/mobile/cart/state';

@Component({
	selector: 'app-berries-shell',
	templateUrl: 'berries-shell.page.html',
	styleUrls: ['berries-shell.page.scss'],
})
export class BerriesShellPage implements OnInit {
	berries$: Observable<Berry[]>;
	cart$: Observable<Cart>;
	currentlyActiveFilters$: Observable<BerryFilters>;

	constructor(private store: Store) {}

	ngOnInit() {
		this.berries$ = this.store.select(getBerries);
		this.currentlyActiveFilters$ = this.store.select(getBerriesFilters);
		this.cart$ = this.store.select(getCart);

		this.store.dispatch(BerryActions.loadBerries());
	}
}
