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
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
  
})
export class DeliveryPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: Address;
  next = false;

  constructor(public navCtrl: NavController,
              private apollo: Apollo,
              private geolocation: Geolocation,
              public popoverCtrl: PopoverController,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public navParams: NavParams) {
            
          this.address = new Address();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
    });
    toast.present();
}


  loadMap(){
    let latLng = new google.maps.LatLng(this.address.location.lattitude,
        this.address.location.longitude);
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

   
}

async ngOnInit() {
  const loading = await this.loadingController.create({
      content: 'Please wait...'
  });
  await loading.present();

      var posOptions = { enableHighAccuracy: true, timeout:5000 , maximumAge: 60000};
      this.geolocation.getCurrentPosition().then((resp) => {
          this.address.location.lattitude = resp.coords.latitude;
          this.address.location.longitude = resp.coords.longitude;

          this.loadMap();
          //this.getAddressFromCoords();
          loading.dismiss();
      }).catch((error) => {
          console.log('Error getting location', error);
          loading.dismiss();
      });
  
}

nextStep(){
  this.next = true;
}

previousStep(){
  this.next = false;
  this.loadMap();
}

onSubmit() {
  console.log(this.address)
}

 
 


}
