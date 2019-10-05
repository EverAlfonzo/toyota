import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnmapPage } from './onmap';

@NgModule({
  declarations: [
    OnmapPage,
  ],
  imports: [
    IonicPageModule.forChild(OnmapPage),
  ],
})
export class OnmapPageModule {}
