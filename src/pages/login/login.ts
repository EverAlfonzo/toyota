import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {User} from "../login/user.model";
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform, AlertController, Nav } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UserService } from '../../providers/services/user.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    user: User = new User();
    private opt: string = 'signin';

    constructor(private storage: Storage,
        public loadingController: LoadingController,
        public navCtrl: NavController,
        private toastCtrl: ToastController,
        private platform: Platform,
        private userService: UserService,
        public alertController: AlertController
    ) { 
        this.user.email = "juanber2.0@gmail.com";
        this.user.password ="juanber";
    }

   
    presentToast(message) {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'bottom'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }


    async doLogin(form: NgForm){
        console.log('login');
        console.log(form.invalid)
        if ( form.invalid ) { return; }

        const loading = await this.loadingController.create({
            content: 'Please wait...'
        });
        this.presentLoading(loading);
        console.log("login: ", this.user);
   
        this.userService.login(this.user.email, this.user.password).then(data =>{
            console.log(data)
            loading.dismiss();
            this.navCtrl.setRoot('MenuPage');
        }).catch(errors =>{
            errors.forEach(e => {
                this.presentToast(e.message);
            });  
            loading.dismiss();
            console.log(errors)
        });

       
    }



    async doSignup(){
        
        const loading = await this.loadingController.create({
            content: 'Please wait...'
        });
        this.presentLoading(loading);
        this.userService.signUp(this.user.email, this.user.password, 
            this.user.name, this.user.phone ).then(data =>{
            console.log(data)
            loading.dismiss();
            this.navCtrl.setRoot('MenuPage');
        }).catch(errors =>{
            errors.forEach(e => {
                this.presentToast(e.message);
            });  
            loading.dismiss();
            console.log(errors)
        });

    }


    async doFbLogin(){
        const loading = await this.loadingController.create({
            content: 'Please wait...'
        });
        this.presentLoading(loading);

        loading.dismiss();
       
    }

    async doGoogleLogin(){
        const loading = await this.loadingController.create({
            content: 'Please wait...'
        });
        this.presentLoading(loading);
        loading.dismiss();
    }



    async presentAlert(message) {
        const alert = await this.alertController.create({
            message: message,
            buttons: ['OK']
        });

        await alert.present();
    }


    async presentLoading(loading) {
        return await loading.present();
    }

}
