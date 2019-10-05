import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Address } from '../login/address.model';

declare var google;
@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
  
})
export class BookingPage {


  constructor(public navCtrl: NavController,
              private apollo: Apollo,
              private geolocation: Geolocation,
              public popoverCtrl: PopoverController,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public navParams: NavParams) {
            
        
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
    });
    toast.present();
}


 
 


}
