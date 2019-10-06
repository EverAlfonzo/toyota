import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TalleresQuery } from './queries';

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

function toRad(x){
  return x * Math.PI / 180;
}


export class GlobalsProvider {

  constructor(public http: HttpClient) {
  }

  public static getDistance(start, end){
    
    if(!start){
      return 0;
    }
      /* DISTANCE BETWEEEN POINTS */
    let earthRadius = {
        miles: 3958.8,
        km: 6371
    };

    let R = earthRadius['km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = toRad((lat2 - lat1));
    let dLon = toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return Math.round(d*10)/10 || 0;

  }
}

export const AppModules =  {
  talleres:{code:'talleres',title:'Talleres',component: 'FindItemPage'},
  articles:{code:'articles', title: 'Consejos Útiles', component: 'ArticlesPage' },
  contact:{code:'contact', title: 'Contacto', component: 'ContactPage' },
  home: { code:'home',title: ' Nosotros', component: 'HomePage'}, 
  findItem: { code:'finditem',title: 'Buscar', component: 'FindItemPage'},
  menu: { code:'menu',title: 'Menu', component: 'MenuPage'},
  booking: { code:'booking',title: 'Agendamiento', component: 'BookingPage'},
  delivery: { code:'delivery',title: 'Toyomovil', component: 'DeliveryPage'},
  services: { code:'services',title: 'Mis Servicios', component: 'ServicesPage'},
  deliveries: { code:'deliveries',title: 'Mis Reservas Toyomovil', component: 'DeliveriesPage'},
  sos: { code:'sos',title: 'Sos', component: 'SosPage'},
  products: { code:'products',title: 'Products', component: 'ProductsPage'}
}

export const DEFAULT_POSITION = {
  lat:-25.2585181,lng:-57.5833408
}
