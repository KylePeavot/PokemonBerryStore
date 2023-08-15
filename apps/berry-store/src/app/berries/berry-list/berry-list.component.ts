import { Component, Input } from '@angular/core';
import { BerryList } from '../berry.service';

@Component({
	selector: 'app-berry-list',
	templateUrl: './berry-list.component.html',
	styleUrls: ['./berry-list.component.scss'],
})
export class BerryListComponent {
	@Input() berries: BerryList;
}
