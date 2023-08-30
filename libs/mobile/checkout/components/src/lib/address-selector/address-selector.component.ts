import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-address-selector',
	templateUrl: 'address-selector.component.html',
	styleUrls: ['address-selector.component.scss'],
})
export class AddressSelectorComponent {
	@Input() addresses: string[] = [];
}
