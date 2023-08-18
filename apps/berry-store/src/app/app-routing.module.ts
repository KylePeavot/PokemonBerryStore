import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'berries',
		loadChildren: () =>
			import('@pokemon-berry-store/mobile/berries/components').then(
				(m) => m.BerriesPageModule
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
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
