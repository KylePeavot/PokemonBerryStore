import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BerriesShellPage } from '@pokemon-berry-store/mobile/berries/components';

const routes: Routes = [
	{
		path: '',
		component: BerriesShellPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BerriesPageRoutingModule {}
