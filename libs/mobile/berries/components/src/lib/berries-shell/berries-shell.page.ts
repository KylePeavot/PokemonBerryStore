import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	Berry,
	BerryActions,
	BerryState,
	getBerries,
} from '@pokemon-berry-store/mobile/berries/state';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-berries-shell',
	templateUrl: 'berries-shell.page.html',
	styleUrls: ['berries-shell.page.scss'],
})
export class BerriesShellPage implements OnInit {
	berries$: Observable<Berry[]>;

	constructor(private store: Store<BerryState>) {}

	ngOnInit() {
		this.berries$ = this.store.select(getBerries);

		this.store.dispatch(BerryActions.loadBerries());
	}
}
