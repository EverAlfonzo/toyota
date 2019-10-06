import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/services/user.service';
import { User } from '../login/user.model';


@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  services: any;
  user: User;
  
  constructor(public navCtrl: NavController,
              private storage: Storage,
              private platform: Platform,
              private userService: UserService
              ) {
                this.platform.ready().then(res=>{
                  this.storage.get('user').then(user=>{
                      this.userService.myServices(user.username).then(data=>{
                        this.services = data.services;
                      })
                  });
                }, err=>{
                  console.log(err)
                });
                
  }

  

  ngOnInit() {
   
  }
  
}
