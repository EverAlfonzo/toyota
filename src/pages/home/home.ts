import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController, ToastController } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Article } from '../articles/articles.component';
import { QueryHome } from './home.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'apollo-client/util/Observable';
import { GalleryModal } from 'ionic-gallery-modal';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  articles: Observable<Article[]>;
  private querySubscription: Subscription;
  item: any = {};
  photos=[];

  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private toastController: ToastController,
    private apollo: Apollo,
    private sanitizer: DomSanitizer
  ) {

    this.getdata();
  }



  getURL(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  getdata() {

    this.querySubscription = this.apollo
      .watchQuery({
        query: QueryHome,
      })
      .valueChanges.subscribe((res: any) => {
        if (res.data) {
          this.item = res.data.company;
          this.articles = res.data.randomArticles;
          this.photos.push({
            url:this.item.image,
            type:''
          });
          this.item.images.forEach(image => {
            this.photos.push({
              url:image,
              type:''
            });
          });
        }
      },error=>{
        this.presentToast("No se pudieron obtener los datos. Verifique su conexión a internet")
        console.log(error)
      });
  }
  getImgContent(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnInit() {
    // se traen los datos de la compañia

  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  // call social media function
  social_media(myEvent) {
    let popover = this.popoverCtrl.create('SocialMediaPage');
    popover.present({
      ev: myEvent
    });
  }

  openPhotos() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: 0
    });
    modal.present();
  }

}
