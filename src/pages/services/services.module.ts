import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesPage } from './services';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesPage),Ionic2RatingModule
  ],
})
export class ServicesPageModule {}
