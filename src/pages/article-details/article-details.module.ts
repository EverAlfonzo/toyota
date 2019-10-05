import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDetailsPage } from './article-details';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ArticleDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleDetailsPage),Ionic2RatingModule
  ],
})
export class ArticleDetailsPageModule {}
