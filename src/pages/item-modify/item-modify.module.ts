import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemModifyPage } from './item-modify';

@NgModule({
  declarations: [
    ItemModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemModifyPage),
  ],
  exports: [
    ItemModifyPage
  ]
})
export class ItemModifyPageModule {}
