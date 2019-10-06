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
import { Delivery } from '../delivery/delivery.model';

declare var google;
@IonicPage()
@Component({
  selector: 'page-delivery-detail',
  templateUrl: 'delivery-detail.html',
  
})
export class DeliveryDetailPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    delivery: Delivery;
    next = false;
    location = new Location();
    loading: any;


    constructor(public navCtrl: NavController,
                private storage: Storage,
                public userService: UserService,
                private geolocation: Geolocation,
                public popoverCtrl: PopoverController,
                public toastController: ToastController,
                public loadingController: LoadingController,
                public navParams: NavParams) {
              


            this.delivery = this.navParams.get('item');
                  

            
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
     

    this.loading.dismiss()
    
    
  }


  async ngOnInit() {
  
    const loading = await this.loadingController.create({
      content: 'Please wait...'
  });
    this.presentLoading(loading)

    this.geolocation.getCurrentPosition().then((resp) => {
     

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

  async presentLoading(loading) {
    return await loading.present();
  }

  async onSubmit(form: NgForm) {
   
    if(form.invalid){
      console.log("invalid")
      this.presentToast("Complete el formulario")
      return
    }
    const loading = await this.loadingController.create({
      content: 'Please wait...'
  });
    this.presentLoading(loading);

  
    this.userService.saveDelivery(this.delivery).then(data=>{
      loading.dismiss();
      this.presentToast("Servicio Toyomóvil solicitado correctamente.")
      this.navCtrl.setRoot('MenuPage');
    }).catch(errors=>{
      errors.forEach(e => {
        this.presentToast(e.message);
    });  
      loading.dismiss();
    })

  }

  
  


}
