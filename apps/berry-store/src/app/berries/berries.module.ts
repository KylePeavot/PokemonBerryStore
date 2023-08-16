import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BerriesShellPage } from './berries-shell/berries-shell.page';

import { BerriesPageRoutingModule } from './berries-routing.module';
import { StoreModule } from '@ngrx/store';
import { berryReducer } from './state/berry.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BerryEffects } from './state/berry.effects';
import { BerryListComponent } from './berry-list/berry-list.component';

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
	declarations: [BerriesShellPage, BerryListComponent],
})
export class BerriesPageModule {}
