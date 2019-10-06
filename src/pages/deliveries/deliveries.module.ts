import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveriesPage } from './deliveries';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DeliveriesPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveriesPage),Ionic2RatingModule
  ],
})
export class DeliveriesPageModule {}
