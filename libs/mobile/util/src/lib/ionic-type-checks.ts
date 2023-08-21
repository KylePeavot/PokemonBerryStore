import { InputCustomEvent } from '@ionic/angular';

export const asInputCustomEvent = (event: Event): InputCustomEvent => {
	return event as InputCustomEvent;
};
