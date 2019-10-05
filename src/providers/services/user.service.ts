import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


const TOKEN_KEY = 'access_token';



@Injectable()
export class UserService {

  user = null;
  authenticationState = new BehaviorSubject(false);

  
  constructor( private apollo: Apollo, 
    private helper: JwtHelperService, 
    private storage: Storage,
    private platform: Platform, 
    private alertController: AlertController) {
      this.platform.ready().then(() => {
        this.checkToken();
      });
  }
  
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
 



	login(email:string,password:string ){
		return new Promise<any>((resolve, reject) => {
            let mutation = ` mutation {
                tokenAuth(username:"${email}", password:"${password}") {
                  token
                }
              }
              `
              console.log(mutation)
              this.apollo.mutate({
                mutation: gql(mutation),
               // errorPolicy: 'none'
              }).subscribe(({ data }) => {
                console.log(data);
                this.storage.set(TOKEN_KEY, data.tokenAuth.token);
                this.user = this.helper.decodeToken(data.tokenAuth.token);
                this.authenticationState.next(true);
                resolve(true)

              }, (err) => {
                // console.log(error)
                if (err.graphQLErrors) {        
                  reject(err.graphQLErrors)
                }    
              reject(err)
          });
        });
    }
    
    signUp(email:string, password:string,name:string, phone:string){

      return new Promise<any>((resolve, reject) => {
        let mutation = ` mutation {
            createUser(name:"${name}", email:"${email}", password:"${password}", phone:"${phone}") {
              user{
                id
                username
                email
                firstName
                profile{
                  image
                  phone
                }
              }
            }
          }
          `
          console.log(mutation)
          this.apollo.mutate({
            mutation: gql(mutation)
          }).subscribe(({ data }) => {
            console.log(data);

            resolve(true)

          }, (err) => {
            // console.log(error)
            if (err.graphQLErrors) {        
              reject(err.graphQLErrors)
            }    
          reject(err)
      })
    });
    }
   
    logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      title: 'Error',
      buttons: ['OK']
    });
    alert.present();
  }

}