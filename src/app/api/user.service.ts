import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../login/user.model";
import {Address, Location} from "../login/address.model";
import { Storage} from '@ionic/storage';
import {Platform, ToastController} from "@ionic/angular";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiUrl = 'http://localhost:3000';


    constructor(public http: HttpClient,
                public platform: Platform,
                public toastController: ToastController,
                private storage: Storage) {
    }

    getFakeUser():User{
        let location = new Location();
        location.lattitude = -25.2840875;
        location.longitude = -57.564168699999996;
        let user = new User();
        user.id = 32423;
        user.phone = 123412341234;
        user.picture = "https://www.svgrepo.com/show/241680/user-profile.svg"
        user.email = "juanber2.0@gmail.com"
        user.name = "Juan Ber"
        let address = new Address();
        address.id = 1;
        address.user_id = user.id;
        address.main = true;
        address.reference = "Hay un arbol enfrente";
        address.addressType = "home";
        address.location = location;
        address.street1 = "Dr. Ramón Frizzola";
        address.street2 = "Caacupe";
        address.number = 333;
        address.name = "Mi casa";
        user.addresses.push(address);

        let address2 = new Address();
        address2.id = 2;
        address.location = location;
        address2.user_id = user.id;
        address2.main = false;
        address2.name = "Trabajo";
        address2.reference = "Al lado de una despensa";
        address2.addressType = "briefcase";
        address2.street1 = "Mcal Lopez";
        address2.street2 = "Ingavi";
        address2.number = 1234;
        user.addresses.push(address2);
        return user;
    }

     async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    getLocalUser(){
        let promise = new Promise((resolve, reject) => {
            let user = new User();
            this.storage.get('fastmer_user')
                .then(data => {
                    user.id = data.id;
                    user.name = data.name;
                    user.email = data.email;
                    user.picture = data.picture;
                    user.addresses = data.addresses;
                    user.phone = data.phone;
                    resolve(user);
                    return user;

                }, error => {
                    reject(user);
                    console.log(error);
                });
        });
        return promise;
    }

    getCurrentUser(){
        return new Promise((resolve,reject) => {
            this.getLocalUser().then(user => {
                resolve(user);
                return user;
            }).catch(user => {
                resolve(user);
                return user;
            });
        })

    }

    saveUser(user: User): User {
        console.log('Guardando user ... ');
        console.log(user);

        this.storage.set('fastmer_user', user);
        return user;
    }

    checkMainAddress(user: User){
        let exists_main = false;
        for (let i = 0; i < user.addresses.length; i++){
            if (user.addresses[i].main){
                exists_main = true;
                break;
            }
        }
        if (!exists_main && user.addresses.length > 0){
            user.addresses[0].main = true;
            this.saveUser(user);
        }

    }

    saveAddress(address: Address, user: User){
        let new_id = 0;
        if (address.main){
            for (let i = 0; i < user.addresses.length; i++){
                if(user.addresses[i].id != address.id){
                    user.addresses[i].main = false;
                }

                if (user.addresses[i].id > new_id){
                    new_id = user.addresses[i].id;
                }

            }
        }
        console.log(address)
        if(!address.id){
            new_id++;
            address.id = new_id;
            user.addresses.push(address);
        }
        this.checkMainAddress(user);
        this.saveUser(user);

    }


}
