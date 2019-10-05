import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController } from 'ionic-angular';
import { QueryArticles } from './articles.component';
import { Apollo } from 'apollo-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {
  articles: any;
  
  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              private apollo: Apollo,
              private sanitizer: DomSanitizer) {
  }

  getImgContent(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
    if (this.articles){
      
    }else{
      this.apollo
        .watchQuery({
          query:QueryArticles,
        })
        .valueChanges.subscribe((res:any) => {
          if (res.data.hasOwnProperty('articles')){
            this.articles = res.data.articles;    
          }
            
        });
    }
   
  }
  
  // call social media function
  social_media(myEvent) {
    let popover = this.popoverCtrl.create('SocialMediaPage');
    popover.present({
      ev: myEvent
    });
  }   
  // like function   
  mark(item){
    item.clicked_mark=(item.clicked_mark!=true)?true:false;
  }
}
