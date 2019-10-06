import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Address } from '../login/address.model';

import { UserService } from '../../providers/services/user.service';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../../providers/services/service.service';
import { Service } from '../booking/booking.model';

declare var google;
@IonicPage()
@Component({
  selector: 'page-service-detail',
  templateUrl: 'service-detail.html',
  
})
export class ServiceDetailPage {
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
            

        this.service = navParams.get('item');

        this.serviceService.getForCreate().then(data=>{
          console.log(data)
            this.brands = data.brands;
            this.workshops = data.talleres;
            this.servicesTypes = data.servicesTypes;
            
        }).catch(err=>{
           console.log(err)
        });
  }


}
