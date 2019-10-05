import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GalleryModal } from 'ionic-gallery-modal';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  item: any = [];
  photos = [];
 

  getURL(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private sanitizer: DomSanitizer) {


    let item = navParams.get('item');
    if (item) {
      this.item = item;
    } else {
      this.navCtrl.push('HomePage');
    }

    if (this.item.image) {
      this.photos.push({
        url: this.item.image,
        type: ''
      });
    }
    if (this.item.images) {
      this.item.images.forEach(image => {
        this.photos.push({
          url: image,
          type: ''
        });
      });
    }

  }


  openPhotos() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: 0
    });
    modal.present();
  }
}

