import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoveragesPage } from './coverages';

@NgModule({
  declarations: [
    CoveragesPage,
  ],
  imports: [
    IonicPageModule.forChild(CoveragesPage),
  ],
})
export class CoveragesPageModule {}
