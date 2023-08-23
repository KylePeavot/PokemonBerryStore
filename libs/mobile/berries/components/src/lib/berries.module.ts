import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BerriesPageRoutingModule } from './berries-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
	BerriesShellPage,
	BerryFiltersComponent,
	BerryListComponent,
} from '@pokemon-berry-store/mobile/berries/components';
import {
	BerryEffects,
	berryReducer,
} from '@pokemon-berry-store/mobile/berries/state';
import { BerryFlavorBarComponent } from './berry-flavor-bar/berry-flavor-bar.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BerriesPageRoutingModule,
		StoreModule.forFeature('berries', berryReducer),
		EffectsModule.forFeature([BerryEffects]),
		NgOptimizedImage,
	],
	declarations: [
		BerriesShellPage,
		BerryListComponent,
		BerryFiltersComponent,
		BerryFlavorBarComponent,
	],
})
export class BerriesPageModule {}
