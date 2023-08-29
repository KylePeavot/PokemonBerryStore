import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutShellPage } from './checkout-shell/checkout-shell.page';

const routes: Routes = [
	{
		path: '',
		component: CheckoutShellPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CheckoutRoutingModule {}
