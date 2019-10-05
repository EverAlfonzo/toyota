import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ObjectlistPage } from './objectlist';

@NgModule({
  declarations: [
    ObjectlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjectlistPage),Ionic2RatingModule
  ],
})
export class ObjectlistPageModule {}
 