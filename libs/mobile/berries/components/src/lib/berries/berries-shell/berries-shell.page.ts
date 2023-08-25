import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	BerryActions,
	BerryFilters,
	BerryState,
	getBerries,
	getBerriesFilters,
} from '@pokemon-berry-store/mobile/berries/state';
import { Observable } from 'rxjs';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';

@Component({
	selector: 'app-berries-shell',
	templateUrl: 'berries-shell.page.html',
	styleUrls: ['berries-shell.page.scss'],
})
export class BerriesShellPage implements OnInit {
	berries$: Observable<Berry[]>;
	currentlyActiveFilters$: Observable<BerryFilters>;

	constructor(private store: Store<BerryState>) {}

	ngOnInit() {
		this.berries$ = this.store.select(getBerries);
		this.currentlyActiveFilters$ = this.store.select(getBerriesFilters);

		this.store.dispatch(BerryActions.loadBerries());
	}
}
