import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { DEFAULT_POSITION } from '../../providers/globals/globals';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-onmap',
  templateUrl: 'onmap.html',
})
export class OnmapPage {
  @ViewChild('map') mapElement: ElementRef; 
  map: any;

  directionsService: any = null;
  directionsDisplay: any = null;
  item:any;
  destination:any;
  currentPosition: any;
  loading: any;
  private watchPositionId: any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingController: LoadingController,
              private geolocation: Geolocation,
              public toastController: ToastController,
              private sanitizer: DomSanitizer) {
              this.item = navParams.get('item');
              if(!this.item){
                navCtrl.goToRoot({});
                return
              }
              this.directionsService = new google.maps.DirectionsService();
              this.directionsDisplay = new google.maps.DirectionsRenderer();
              this.presentLoading();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      content: '',
      spinner: 'bubbles',
      cssClass: 'primary',
      duration:10000
    });
    await this.loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  setMap(){
    if (!this.map){
      let position: any;
      if(this.currentPosition){
        position = {
          lat: this.currentPosition.lat,
          lng: this.currentPosition.lng
        }
      }else{
        position = DEFAULT_POSITION;
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 10,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }
  }

  getImgContent(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private init() {
    return this.setCurrentPosition().then(
      (res:any) => {
        this.setMap();
        return  this.setMarker().then((res)=>{
          this.loading.dismiss();
        });
      }
    ).catch((res)=>{
      this.setMap();
      this.presentToast("Debe activar el gps para determinar su ubicación actual y trazar la ruta..")
      this.navCtrl.pop();

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

// Function to add marker at current location
addMarker(position,content){
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: position
  });  
    this.addInfoWindow(marker, content);
}
  

addInfoWindow(marker, content){
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);

  });
}

ngAfterViewInit(){
    this.init();
}

 
  setMarker(){
    return new Promise<any>((resolve, reject) => {
        if(!this.item){
            this.navCtrl.goToRoot({});
            resolve(true)
          }
        let lat = parseFloat(this.item.location.split(",")[0]);
        let lng = parseFloat(this.item.location.split(",")[1]);
        this.destination = new google.maps.LatLng(lat, lng);
        let content = `
              <style>
              #iw-container  .iw-title {
                font-family: 'Open Sans Condensed', sans-serif;
                font-size: 15px;
                font-weight: 400;
                padding: 10px;
                background-color: #488aff;
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
                <div class="iw-title">${this.item.name}</div>
                <div class="iw-content">
                <p style="padding-left: 2px;vertical-align:top;">${this.item.description || ''}</p>
                <strong>Dirección:</strong> ${this.item.address}<br>
                <strong>Teléfono:</strong> ${this.item.phone}<br>
                </p>
                </div>
              </div>`;
              this.addMarker({lat:lat,lng:lng},content)
              resolve(true)
          });

  }

  calculateAndDisplayRoute() {
    
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setOptions({ suppressMarkers: true } );
        this.directionsService.route({
          origin: this.currentPosition,
          destination:this.destination,
          provideRouteAlternatives:true,
          travelMode: "DRIVING",
          unitSystem: google.maps.UnitSystem.IMPERIAL
        }, (response, status) => {
          if (status ===  google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });    
  }

  
}
