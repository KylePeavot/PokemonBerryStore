import { NgModule } from '@angular/core';
import { BerryStoreHeader } from './berry-store-header/berry-store-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@NgModule({
	declarations: [BerryStoreHeader],
	exports: [BerryStoreHeader],
	imports: [IonicModule, RouterLink],
})
export class SharedModule {}
