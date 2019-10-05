import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialMediaPage } from './social-media';

@NgModule({
  declarations: [
    SocialMediaPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialMediaPage),
  ],
})
export class SocialMediaPageModule {}
