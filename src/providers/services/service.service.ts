import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Apollo } from "apollo-angular";
import { Platform } from "ionic-angular";
import { Service } from "../../pages/booking/booking.model";
import gql from "graphql-tag";


@Injectable()
export class ServiceService {
    constructor( private apollo: Apollo, 
        private storage: Storage,
        private platform: Platform
        ) {
          this.platform.ready().then(() => {
            
          });
      }

      getForCreate(){
        return new Promise<any>((resolve, reject) => {
            
            let query = `
            {
                brands{
                id
                name
                modelSet{
                  id
                  name
                }
              }
              talleres{
                id
                name
                image
                city{
                    id
                    name
                  }
              }
              servicesTypes{
                id
                name
              }
            }`
            this.apollo
            .watchQuery({
                query:gql(query),
            })
            .valueChanges.subscribe((res:any) => {
                resolve(res.data)
            },error=>{
                console.log(error)
                resolve(error)
            });
            
        });
      }

      saveService(service: Service){
        return new Promise<any>((resolve, reject) => {
            let mutation = `
            mutation {
                createService(userId:${service.userId}, document:"${service.document}",
                 brandId:${service.brandId}, modelId:${service.modelId}, year:${service.year},
                  carKm:${service.carKm}, licensePlate:"${service.licensePlate}", 
                  idType:"${service.idType}",workshopId:"${service.workshopId}",
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
                    serviceType{
                        id
                        name
                      }
                    licensePlate
                    workshop{
                      id
                      name
                      city{
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
              console.log(mutation)
              this.apollo.mutate({
                mutation: gql(mutation),
               // errorPolicy: 'none'
              }).subscribe(({ data }) => {
                console.log(data);
                resolve(data)

              }, (err) => {
                // console.log(error)
                if (err.graphQLErrors) {        
                  reject(err.graphQLErrors)
                }    
              reject(err)
          });
        });
      }

}