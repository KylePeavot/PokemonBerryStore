import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BerriesShellPage } from './berries-shell/berries-shell.page';

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
