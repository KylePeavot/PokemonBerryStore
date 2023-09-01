import { Component, EventEmitter, Input, Output } from '@angular/core';
import { asInputCustomEvent } from '@pokemon-berry-store/mobile/util';
import { InputCustomEvent } from '@ionic/angular';

@Component({
	selector: 'app-date-selector',
	templateUrl: 'date-selector.component.html',
	styleUrls: ['date-selector.component.scss'],
})
export class DateSelectorComponent {
	@Input() date: Date;
	@Output() dateChange = new EventEmitter<Date>();

	isDateValid = (dateString: string) => {
		const date = new Date(dateString);

		if (date < new Date()) {
			return false;
		}

		const utcDay = date.getUTCDay();

		/**
		 * Date will be enabled if it is not
		 * Sunday or Saturday
		 */
		return utcDay !== 0 && utcDay !== 6;
	};

	handleDateTimeChanged($event: InputCustomEvent) {
		if (!$event.detail.value) {
			return;
		}

		this.dateChange.emit(new Date($event.detail.value));
	}

	protected readonly asInputCustomEvent = asInputCustomEvent;
}
