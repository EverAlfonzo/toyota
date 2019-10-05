import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { GlobalsProvider, AppModules, DEFAULT_POSITION } from '../../providers/globals/globals';
import { getMutation } from '../../providers/globals/queries';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-find-item',
  templateUrl: 'find-item.html',
})
export class FindItemPage {
  @ViewChild('map') mapElement: ElementRef;
  private querySubscription: Subscription;
  map: any;
  all_data: any = [];
  departments: any = [];
  cities: any = [];
  item_list: any = [];
  seeOnMap = true;
  title = "Buscar";
  modules_list: any = [];
  showFilterForm = true;
  enableSearchButton = true;
  selected_department: string = "";
  selected_city: string = "";
  selected_item: string;
  directionsService: any = null;
  directionsDisplay: any = null;
  loading: any;
  public markers: any[] = [];

  destination: any;
  currentPosition: any;

  getImgContent(url): SafeUrl {
    // elimina caracteres ilegales de la url
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private geolocation: Geolocation,
    private apollo: Apollo,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private sanitizer: DomSanitizer) {

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    
  
      let selected_item = this.navParams.get('moduleName');
      
      let title = this.navParams.get('title');
      if (title){
        this.title = title;
      }

  
    this.setMap();


    this.presentLoading();
    this.getModules();
    this.getDepartmentsAndCites().then((res) => {
      this.loading.dismiss();
    }).catch(res=>{
      this.presentToast("No se pudo obtener datos. Verifique su conexión.")
      this.loading.dismiss();
    });

  }


  compareFn(e1, e2): boolean {
    return e1 === e2;
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      content: '',
      spinner: 'bubbles',
      cssClass: 'primary',
      duration:30000
    });
    await this.loading.present();
    
  }

  getModules() {
    this.modules_list.push(AppModules.talleres.code);
    console.log(this.modules_list)
  }


  getQuery(data) {
    return `query {
      ${data}{
        id
        name
        description
        phone
        address
        largeDescription
        city {
          id
          name
          department {
            id
            name
            }
        }
        location
        image
      },`
  }


  getDepartmentsAndCites() {
    return new Promise<any>((resolve, reject) => {
      let query = gql`
      query {
        departments {
          id
          name
        }
        cities {
          id
          name
          department {
            id
            name
          }
        }
      }
      `
      this.querySubscription = this.apollo
        .watchQuery({
          query: query,
        })
        .valueChanges.subscribe((res: any) => {
          this.all_data = res.data;
          this.departments = res.data.departments;
          this.cities = res.data.cities;
        },error=>{
          this.presentToast("No se pudieron obtener los datos. Verifique su conexión a internet")
          console.log(error)
          resolve(true)
        });
      resolve(true)
    });
  }

  setCurrentPosition() {
    // se obtiene la posicion actual del usuario
    return new Promise<any>((resolve, reject) => {
      this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((res) => {
        this.currentPosition = { lat: res.coords.latitude, lng: res.coords.longitude }
        resolve(true)
      }).catch((error) => {
        this.presentToast("No se puede determinar su ubicación actual..")
        resolve(false)
      });
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  getMutationName() {
    let mutationName = "searchTalleres";
   
    return mutationName;
  }

  getItemList() {
    return new Promise<any>((resolve, reject) => {
      this.item_list = [];
      let mutationName = this.getMutationName();
      let mutation = getMutation(mutationName,
        this.selected_item,
        this.selected_department,
        this.selected_city
      );
      this.apollo.mutate({
        mutation: mutation,
      }).subscribe(({ data }) => {
        this.item_list = data[mutationName]["objectList"];
        if (this.currentPosition) {
          this.item_list.forEach(i => {
            if (i.location.split(",").length == 2) {
              let lat = parseFloat(i.location.split(",")[0]) || 0;
              let lng = parseFloat(i.location.split(",")[1]) || 0;
              i.distance = GlobalsProvider.getDistance({
                lat: this.currentPosition.lat,
                lng: this.currentPosition.lng
              }, { lat: lat, lng: lng });
            } else {
              i.distance = 0;
            }
          });
          // ORDENAR POR DISTANCIA
          this.item_list.sort((a, b) => a.distance - b.distance);
        }
        resolve(true)
      }, (error) => {
        console.log(error)
        resolve(false)
      });
    });
  }

  search() {
    this.presentLoading();
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.setCurrentPosition().then(firstRes => {
      this.setMap();
      this.getItemList().then(secondRes => {
        this.setMarkers();
        this.loading.dismiss();
      })
    });
  }

  setMap() {
    this.platform.ready().then(res => {
      let position: any;
      if (this.currentPosition) {
        position = {
          lat: this.currentPosition.lat,
          lng: this.currentPosition.lng
        }
      } else {
        position = DEFAULT_POSITION;
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 10,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    });

  }


  onchangeItem(data) {
    this.selected_item = data;
   
  }

  onchangeDepartment($event) {
    this.selected_department = $event;
    this.selected_city = "";
    this.cities = [];
    this.all_data.cities.forEach(c => {
      if (c.department.id == $event) {
        this.cities.push(c);
      }
    });
    
  }


  onchangeCity(data) {
    this.selected_city = data;
  }

  onchangeCheckbox(data) {
    this.seeOnMap = !this.seeOnMap;
  }

  addMarker(position, content, item) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    this.markers.push(marker);

    this.addInfoWindow(marker, content, item);
  }


  addInfoWindow(marker, content, item) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById(item.id).addEventListener('click', () => {
        this.navCtrl.push('OnmapPage', {
          item: item
        });
      });
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  setMarkers() {
    return new Promise<any>((resolve, reject) => {
      this.item_list.forEach((item, index) => {

        let lat = parseFloat(item.location.split(",")[0]);
        let lng = parseFloat(item.location.split(",")[1]);

        let content = `
              <style>
              #iw-container  .iw-title {
                font-family: 'Open Sans Condensed', sans-serif;
                font-size: 15px;
                font-weight: 400;
                padding: 10px;
                background-color: #cc0000;
                color: white;
                margin: 1px;
                border-radius: 2px 2px 0 0; /* In accordance with the rounding of the default infowindow corners. */
            }

            .gm-style-iw {
              width: 350px !important;
              top: 0 !important;
              left: 0 !important;
              border-radius: 2px 2px 0 0;
          }

          .gm-style-iw {
            width: 350px !important;
            top: 15px !important; // move the infowindow 15px down
            left: 0 !important;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(178, 178, 178, 0.6);
            border: 1px solid rgba(72, 181, 233, 0.6);
            border-radius: 2px 2px 0 0;
        }
        
            </style>
              <div id="iw-container">
                <div class="iw-title" id="${item.id}">${item.name}</div>
                <div class="iw-content">
                <p style="padding-left: 2px;vertical-align:top;">${item.description || ''}</p>
                <strong>Dirección:</strong> ${item.address}<br>
                <strong>Teléfono:</strong> ${item.phone}<br>
                </p>
                </div>
              </div>`;
        this.addMarker({ lat: lat, lng: lng }, content, item)
      });
    });
  }
}
