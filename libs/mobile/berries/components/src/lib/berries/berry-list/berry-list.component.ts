import { Component, Input } from '@angular/core';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';

@Component({
	selector: 'app-berry-list',
	templateUrl: './berry-list.component.html',
	styleUrls: ['./berry-list.component.scss'],
})
export class BerryListComponent {
	@Input() berries: Berry[];
}
