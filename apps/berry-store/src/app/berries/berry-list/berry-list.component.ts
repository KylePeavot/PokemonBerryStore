import { Component, Input } from '@angular/core';
import { Berry } from '../state/berry.reducer';

@Component({
	selector: 'app-berry-list',
	templateUrl: './berry-list.component.html',
	styleUrls: ['./berry-list.component.scss'],
})
export class BerryListComponent {
	@Input() berries: Berry[];
}
