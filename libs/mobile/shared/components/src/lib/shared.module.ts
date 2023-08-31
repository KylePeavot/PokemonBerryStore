import { NgModule } from '@angular/core';
import { BerryStoreHeader } from './berry-store-header/berry-store-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateSelectorComponent } from './date-selector/date-selector.component';

@NgModule({
	declarations: [BerryStoreHeader, CounterComponent, DateSelectorComponent],
	exports: [BerryStoreHeader, CounterComponent, DateSelectorComponent],
	imports: [IonicModule, RouterLink, FormsModule, CommonModule],
})
export class SharedModule {}
