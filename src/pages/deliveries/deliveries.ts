import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/services/user.service';
import { User } from '../login/user.model';
import { Delivery } from '../delivery/delivery.model';
import { Location } from '../login/address.model';


@IonicPage()
@Component({
  selector: 'page-deliveries',
  templateUrl: 'deliveries.html',
})
export class DeliveriesPage {
  deliveries: any = [];
  user: User;
  
  constructor(public navCtrl: NavController,
              private storage: Storage,
              private platform: Platform,
              private userService: UserService
              ) {
                this.platform.ready().then(res=>{
                  this.storage.get('user').then(user=>{
                      this.userService.myDeliveries(user.username).then(data=>{

                        let data_list = [];
                        data.deliveries.forEach(delivery => {
                          let lat = parseFloat(delivery.location.split(",")[0]);
                          let lng = parseFloat(delivery.location.split(",")[1]);
                          console.log(lat, lng)
                          delivery.location = new Location();
                          delivery.location.lattitude = lat;
                          delivery.location.longitude = lng;
                          console.log(delivery)
                          let d = new Delivery().deserialize(delivery);
                        
                          this.deliveries.push(d);

                        });
                        
                      })
                  });
                }, err=>{
                  console.log(err)
                });
                
  }

  

  ngOnInit() {
   
  }
  
}
