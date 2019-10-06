import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Delivery } from '../../pages/delivery/delivery.model';
import { Service } from '../../pages/booking/booking.model';
import { Location } from '../../pages/login/address.model';



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
              this.apollo.mutate({
                mutation: gql(mutation),
               // errorPolicy: 'none'
              }).subscribe(({ data }) => {
                this.storage.set(TOKEN_KEY, data.tokenAuth.token);
                this.user = this.helper.decodeToken(data.tokenAuth.token);
                this.storage.set('user', this.user);
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

  

  saveDelivery(delivery:Delivery){
    
    
    return new Promise<any>((resolve, reject) => {

        let mutation = `mutation {
          createDelivery(userId:${delivery.userId}, number:${delivery.number},
            comment:"${delivery.comment}", 
            location:"${delivery.location.lattitude},${delivery.location.longitude}",
          time:"${delivery.time}", date:"${delivery.date}") {
            delivery{
              user{
                id
                username
              }
              date
              time
              location
              comment
            }
          }
        }
        `
      
        this.apollo.mutate({
          mutation: gql(mutation)
        }).subscribe(({ data }) => {
          resolve(true)
        }, (err) => {
          if (err.graphQLErrors) {        
            reject(err.graphQLErrors)
          }    
        reject(err)
        })
      });
        
  }


  me(username){
    
    return new Promise<any>((resolve, reject) => {
      let mutation = ` mutation {
        userData(username: "${username}") {
          user {
            id
            username
            email
            firstName
            profile {
              phone
              image
            }
          }
        }
      }
      `
      this.apollo.mutate({
        mutation: gql(mutation)
      }).subscribe(({ data }) => {
        resolve(data.userData.user)
      }, (err) => {
        console.log(err)
        if (err.graphQLErrors) {        
          reject(err.graphQLErrors)
        }    
      reject(err)
      })
    });
      
  }


  saveService(service:Service){
    
    
    return new Promise<any>((resolve, reject) => {

        let mutation = `
        mutation {
          createService(userId:${service.userId}, document:"${service.document}", 
                brandId:${service.brandId}, modelId:${service.brandId}, year:${service.year},
                carKm:${service.carKm}, licensePlate:"${service.licensePlate}", 
                serviceTypeId:${service.serviceTypeId},
                idType:"${service.idType}", workshopId:${service.workshopId}, 
            date:"${service.date}", time:"${service.time}", comment:"${service.comment}") {
            service {
              id
              user{
                id
                username
                email
                profile{
                  phone
                }
              }
              document
              brand{
                id
                name
              }
              model{
                id
                name
              }
              year
              carKm
              idType
              licensePlate
              workshop{
                id
                name
              }
              idType
              date
              time
              comment
             
            }
          }
        }
        
        `
          console.log(mutation)
      
        this.apollo.mutate({
          mutation: gql(mutation)
        }).subscribe(({ data }) => {
          resolve(data)
        }, (err) => {
          if (err.graphQLErrors) {        
            reject(err.graphQLErrors)
          }    
        reject(err)
        })
      });
        
  }


  myServices(username){
    
    return new Promise<any>((resolve, reject) => {
      let mutation = `mutation {
        myServices(username: "${username}") {
          services {
            id
            user {
              id
              username
              email
              profile {
                phone
              }
            }
            document
            brand {
              id
              name
            }
            model {
              id
              name
            }
            year
            carKm
            idType
            serviceType {
              id
              name
            }
            licensePlate
            workshop {
              id
              name
              city {
                id
                name
              }
            }
            idType
            date
            time
            comment
          }
        }
      }
      
      `
      this.apollo.mutate({
        mutation: gql(mutation)
      }).subscribe(({ data }) => {
        resolve(data.myServices)
      }, (err) => {
        console.log(err)
        if (err.graphQLErrors) {        
            (err.graphQLErrors)
        }    
      reject(err)
      })
    });
  }


  myDeliveries(username){
    
    return new Promise<any>((resolve, reject) => {
      let mutation = `mutation {
        myDeliveries(username: "${username}") {
          deliveries {
            id
            user {
              id
              username
            }
            number
            date
            time
            location
            comment
          }
        }
      }
      
      `
      this.apollo.mutate({
        mutation: gql(mutation)
      }).subscribe(({ data }) => {
        
        resolve(data.myDeliveries)
      }, (err) => {
        console.log(err)
        if (err.graphQLErrors) {        
            (err.graphQLErrors)
        }    
      reject(err)
      })
    });
  }

}