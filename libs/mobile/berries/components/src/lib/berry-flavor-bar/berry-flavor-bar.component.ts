import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-berry-flavor-bar',
	styleUrls: ['./berry-flavor-bar.component.scss'],
	templateUrl: './berry-flavor-bar.component.html',
})
export class BerryFlavorBarComponent {
	@Input() flavorLabel: string;
	@Input() potency: number;
}
