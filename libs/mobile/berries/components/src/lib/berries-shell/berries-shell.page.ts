import { Component, OnInit } from '@angular/core';
import { State } from '../state';
import { Store } from '@ngrx/store';
import * as BerryActions from '../state/berry.actions';
import { Observable } from 'rxjs';
import { Berry, getBerries } from '../state/berry.reducer';

@Component({
	selector: 'app-berries-shell',
	templateUrl: 'berries-shell.page.html',
	styleUrls: ['berries-shell.page.scss'],
})
export class BerriesShellPage implements OnInit {
	berries$: Observable<Berry[]>;

	constructor(private store: Store<State>) {}

	ngOnInit() {
		this.berries$ = this.store.select(getBerries);

		this.store.dispatch(BerryActions.loadBerries());
	}
}
