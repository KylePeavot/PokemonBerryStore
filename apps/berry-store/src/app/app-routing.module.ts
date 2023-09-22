import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'berries',
		loadChildren: () =>
			import('@pokemon-berry-store/mobile/berries/components').then(
				(m) => m.BerriesModule
			),
	},
	{
		path: 'checkout',
		loadChildren: () =>
			import('@pokemon-berry-store/mobile/checkout/components').then(
				(m) => m.CheckoutPageModule
			),
	},
	{
		path: '',
		redirectTo: 'berries',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
