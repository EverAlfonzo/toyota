import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindItemPage } from './find-item';

@NgModule({
  declarations: [
    FindItemPage,
  ],
  imports: [
    IonicPageModule.forChild(FindItemPage),
  ],
})
export class FindItemPageModule {}
