import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLatestOrder } from '@pokemon-berry-store/mobile/orders/state';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-order-confirmation-toast',
	templateUrl: 'order-confirmation-toast.component.html',
	styleUrls: ['order-confirmation-toast.component.scss'],
})
export class OrderConfirmationToastComponent implements OnInit {
	constructor(
		private store: Store,
		private toastController: ToastController
	) {}

	ngOnInit() {
		this.store.select(getLatestOrder).subscribe(async (order) => {
			if (order) {
				const toast = await this.toastController.create({
					header: `Order #${order.id} placed successfully!`,
					message:
						'Your order will be delivered on ' +
						order.deliveryDate.toLocaleDateString('en-GB', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						}),
					duration: 7500,
					position: 'top',
				});

				await toast.present();
			}
		});
	}
}
