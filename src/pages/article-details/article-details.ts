import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams} from 'ionic-angular';
import { Article, QueryArticles } from '../articles/articles.component';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';


@IonicPage()
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {
  item: Article;
  rate=0;
  clicked_mark=false;

  constructor(public navCtrl: NavController,
              private apollo: Apollo,
              public popoverCtrl: PopoverController,
              public navParams: NavParams,
              private sanitizer: DomSanitizer) {
            
                this.item = this.navParams.get('item');
          
  }
  getImgContent(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
  
      // this.apollo
      //   .watchQuery({
      //     query:QueryArticles,
      //   })
      //   .valueChanges.subscribe((res:any) => {
      //     if (res.data.hasOwnProperty('articles')){
      //       this.item = res.data.articles[0];    
      //     }
      //     if(!this.item){
      //       this.navCtrl.push('HomePage');
      //     }   
      //   });
  }

  

  
  // call social media function
  social_media(myEvent) {
    let popover = this.popoverCtrl.create('SocialMediaPage');
    popover.present({
      ev: myEvent
    });
  }   
  // like function   
  mark(){
    this.clicked_mark=(this.clicked_mark!=true)?true:false;
  }
}
