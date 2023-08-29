import { NgModule } from '@angular/core';
import { BerryStoreHeader } from './berry-store-header/berry-store-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [BerryStoreHeader, CounterComponent],
	exports: [BerryStoreHeader, CounterComponent],
	imports: [IonicModule, RouterLink, FormsModule, CommonModule],
})
export class SharedModule {}
