import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {BerriesPage} from './berries.page';

import {BerriesPageRoutingModule} from './berries-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BerriesPageRoutingModule],
  declarations: [BerriesPage],
})
export class BerriesPageModule {
}
