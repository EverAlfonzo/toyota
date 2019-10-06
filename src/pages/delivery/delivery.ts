import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Address } from '../login/address.model';
import { Delivery } from './delivery.model';
import { UserService } from '../../providers/services/user.service';
import { NgForm } from '@angular/forms';

declare var google;
@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
  
})
export class DeliveryPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  delivery: Delivery;
  next = false;
  


  constructor(public navCtrl: NavController,
              public userService: UserService,
              private geolocation: Geolocation,
              public popoverCtrl: PopoverController,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public navParams: NavParams) {
            
          this.delivery = new Delivery();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
    });
    toast.present();
}


  loadMap(){
    let latLng = new google.maps.LatLng(this.delivery.location.lattitude,
        this.delivery.location.longitude);
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
      this.delivery.location.lattitude = this.map.center.lat();
      this.delivery.location.longitude = this.map.center.lng();
      //this.getAddressFromCoords()
  });
   
}


async ngOnInit() {
  const loading = await this.loadingController.create({
      content: 'Please wait...'
  });
  await loading.present();

      var posOptions = { enableHighAccuracy: true, timeout:5000 , maximumAge: 60000};
      this.geolocation.getCurrentPosition().then((resp) => {
          this.delivery.location.lattitude = resp.coords.latitude;
          this.delivery.location.longitude = resp.coords.longitude;

          this.loadMap();
          //this.getAddressFromCoords();
          loading.dismiss();
      }).catch((error) => {
          console.log('Error getting location', error);
          loading.dismiss();
      });
      
      this.userService.me().then(me=>{
        console.log(me)
      })
}

nextStep(){
  this.next = true;
}

previousStep(){
  this.next = false;
  this.loadMap();
}

async presentLoading(loading) {
  return await loading.present();
}

async onSubmit(form: NgForm) {
  console.log(form)
  console.log(this.delivery)
  if(form.invalid){
    return
  }
  const loading = await this.loadingController.create({
    content: 'Please wait...'
});
  this.presentLoading(loading);

 
  this.userService.saveDelivery(this.delivery).then(data=>{
    loading.dismiss();
    this.presentToast("Servicio Toyomóvil solicitado correctamente.")
  }).catch(errors=>{
    errors.forEach(e => {
      this.presentToast(e.message);
  });  
    loading.dismiss();
  })

}

 
 


}
