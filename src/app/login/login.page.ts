import { Component } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import {User} from "../login/user.model";
import {Address} from "../login/address.model";
import { UserService } from '../api/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    user: User = new User();
    private opt: string = 'signin';

    constructor(private storage: Storage,
        public loadingController: LoadingController,
        private router: Router,
        private route: ActivatedRoute,
        private platform: Platform,
        public userService: UserService,
        public alertController: AlertController
    ) { }

    async doLogin(){
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        this.presentLoading(loading);
        console.log("login: ", this.user);
        this.userService.saveUser(this.user);
        loading.dismiss();
        this.goToUserPage();
    }

    goToUserPage(){
        // let navigationExtras: NavigationExtras = {
        //     state: {
        //         user: this.user
        //     }
        // };
        this.router.navigate(["/tab2"]);
    }


    async doSignup(){

        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        this.presentLoading(loading);
        this.userService.saveUser(this.user);
        this.goToUserPage();
        loading.dismiss();

    }


    async doFbLogin(){
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        this.presentLoading(loading);

        loading.dismiss();
       
    }

    async doGoogleLogin(){
        const loading = await this.loadingController.create({
            message: 'Please wait...'
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
