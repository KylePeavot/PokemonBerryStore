import { InputCustomEvent } from '@ionic/angular';

export const asInputCustomEventOrThrow = (event: Event): InputCustomEvent => {
	if (event instanceof InputEvent) {
		throw new Error(
			`Expected InputEvent, received ${event.constructor.name}`
		);
	}

	return event as InputCustomEvent;
};
