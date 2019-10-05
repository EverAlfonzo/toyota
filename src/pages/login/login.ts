import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {User} from "../login/user.model";
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform, AlertController, Nav } from 'ionic-angular';
import {Address} from "../login/address.model";
import { NgForm } from '@angular/forms';

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
        private platform: Platform,
        public alertController: AlertController
    ) { }

   

    async doLogin(form: NgForm){
        console.log('login');
        console.log(form.invalid)
        if ( form.invalid ) { return; }

        const loading = await this.loadingController.create({
            content: 'Please wait...'
        });
        this.presentLoading(loading);
        console.log("login: ", this.user);
        loading.dismiss();

        this.navCtrl.setRoot('MenuPage');
        //this.goToUserPage();
    }

    goToUserPage(){
        // let navigationExtras: NavigationExtras = {
        //     state: {
        //         user: this.user
        //     }
        // };
    }


    async doSignup(){

        const loading = await this.loadingController.create({
            content: 'Please wait...'
        });
        this.presentLoading(loading);
        // this.goToUserPage();
        loading.dismiss();
        this.navCtrl.setRoot('MenuPage');

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
