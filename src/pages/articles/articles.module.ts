import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesPage } from './articles';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ArticlesPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlesPage),Ionic2RatingModule
  ],
})
export class ArticlesPageModule {}
