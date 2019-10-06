import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Address, Location } from '../login/address.model';

import { UserService } from '../../providers/services/user.service';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

declare var google;
@IonicPage()
@Component({
  selector: 'page-sos',
  templateUrl: 'sos.html',
  
})
export class SosPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    location: Location;
    next = false;
    comment:string ="Necesito: ";
    


    constructor(public navCtrl: NavController,
                private storage: Storage,
                public userService: UserService,
                private geolocation: Geolocation,
                public popoverCtrl: PopoverController,
                public toastController: ToastController,
                public loadingController: LoadingController,
                public navParams: NavParams) {
              this.location = new Location();
           

    }

    async presentToast(message) {
      const toast = await this.toastController.create({
          message: message,
          duration: 2000
      });
      toast.present();
  }


    loadMap(){
      let latLng = new google.maps.LatLng(this.location.lattitude, this.location.longitude);
      let mapOptions = {
          center: latLng,
          zoom: 15,
          myLocationButton : true,
          rotateControl: true,
          myLocation: true,
          mapTypeControl: false,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          controls: {
              zoom: true,
          }
      };


      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        this.location.lattitude = this.map.center.lat();
        this.location.longitude = this.map.center.lng();
        //this.getAddressFromCoords()
    });
    
  }


  async ngOnInit() {
    const loading = await this.loadingController.create({
        content: 'Please wait...'
    });
    await loading.present();

        this.geolocation.getCurrentPosition().then((resp) => {
            this.location.lattitude = resp.coords.latitude;
            this.location.longitude = resp.coords.longitude;

            this.loadMap();
            //this.getAddressFromCoords();
            loading.dismiss();
        }).catch((error) => {
            console.log('Error getting location', error);
            loading.dismiss();
        });
        
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async onSubmit() {
   
    const loading = await this.loadingController.create({
      content: 'Please wait...'
  });
    this.presentLoading(loading);

    loading.dismiss();
   
      this.presentToast("Ayuda en camino. En breve nos pondremos en contacto con ustede.")
   
  }

  
  


}
