import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Address } from '../login/address.model';
import { Service } from './booking.model';
import { UserService } from '../../providers/services/user.service';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../../providers/services/service.service';

declare var google;
@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
  
})
export class BookingPage {
  service: Service;
  brands: any = [];
  models: any = [];
  workshops: any = [];
  servicesTypes: any = [];
  selected_brand = null;
  selected_model = null;
  selected_workshop = null;


  constructor(public navCtrl: NavController,
              private storage: Storage,
              private userService: UserService,
              private serviceService: ServiceService,
              public popoverCtrl: PopoverController,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public navParams: NavParams) {
            
        this.service = new Service();

        this.storage.get('user').then(user=>{
          this.userService.me(user.username).then(me =>{
            this.service.userId = me.id;
          })
        });
        this.serviceService.getForCreate().then(data=>{
          console.log(data)
            this.brands = data.brands;
            this.workshops = data.talleres;
            this.servicesTypes = data.servicesTypes;
            
        }).catch(err=>{
           console.log(err)
        });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
    });
    toast.present();
}

async onSubmit(form: NgForm) {
  console.log(form)
  console.log(this.service)
  if(form.invalid){
    return
  }
  const loading = await this.loadingController.create({
    content: 'Please wait...'
});
  this.presentLoading(loading);


  this.serviceService.saveService(this.service).then(data=>{
    loading.dismiss();
    this.presentToast("Agendamiento solicitado correctamente.");
    this.navCtrl.setRoot('MenuPage');
  }).catch(errors=>{
    errors.forEach(e => {
      this.presentToast(e.message);
  });  
    loading.dismiss();
  })

}
 
async presentLoading(loading) {
  return await loading.present();
}
onchangeBrand($brandId){
  this.selected_brand = $brandId;
  if(!$brandId){
    this.models = [];
  }else{
    this.brands.forEach(brand => {
      if(brand.id === $brandId){
        this.models = brand.modelSet;
      }
  });
  }
 
}

onchangeModel($modelId){
  this.selected_model = $modelId;
}


}
