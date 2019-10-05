import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GlobalsProvider, AppModules } from '../../providers/globals/globals';
import { Subscription } from 'apollo-client/util/Observable';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-objectlist',
  templateUrl: 'objectlist.html',
})
export class ObjectlistPage {
  resultQty = 500;
  all_data:any=[];
  selected_department: number = 0;
  selected_city: number = 0;
  grid_style=false;
  currentPosition: any=false;
  item_list: any;
  departments: any=[];
  cities: any=[];
  showFilterForm = true;
  pageQuery: any;
  loading:any;
  title = "";
  moduleName = "";
  departmentPlaceholder = "Seleccione Departamento..";
  private querySubscription: Subscription;

  constructor(public navCtrl: NavController,
              public loadingController: LoadingController,
              private apollo: Apollo,
              public navParams: NavParams,
              private geolocation: Geolocation,
              public toastController: ToastController,
              public statusBar: StatusBar,
              private sanitizer: DomSanitizer) {
              this.pageQuery = navParams.get('pageQuery');
              this.moduleName = navParams.get('moduleName');
              
              if(!this.pageQuery || !this.moduleName){
                navCtrl.goToRoot({});
                return
              }
              console.log(this.pageQuery)
              console.log(this.moduleName)
              this.title = navParams.get('title');
              this.presentLoading();
              this.getItemList().then((res)=>{
                this.loading.dismiss();
              });
              this.setCurrentPosition();
              
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      content: '',
      spinner:'bubbles',
      cssClass:'primary',
      duration:10000
    });
    await this.loading.present();
  }

  getImgContent(url): SafeUrl {
    // elimina caracteres ilegales de la url
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }


  ngOnInit() {

  }

  init(){
    //this.statusBar.styleDefault();
  // nos aseguramos de que se ejecute en el siguiente orden
  
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

  ionViewDidLeave() {
    if(this.querySubscription){
      this.querySubscription.unsubscribe();
    }
  }
  setItemList(){
    
      this.item_list = this.all_data.talleres;

     /* Una vez que se obtienen los datos de la base de datos se obtienen las latitudes
      y logitudes de los items y se calcula la distancia respecto a la posicion
      del usuario */
      this.item_list.forEach(i => {
        if (i.location.split(",").length==2){ 
          let lat = parseFloat(i.location.split(",")[0])||0;
          let lng = parseFloat(i.location.split(",")[1])||0;
          i.distance = GlobalsProvider.getDistance({
            lat: this.currentPosition.lat(),
            lng: this.currentPosition.lng()
          },{lat: lat,lng: lng});
        }else{
          i.distance = 0;
        }
    });
    // ORDENAR POR DISTANCIA
    this.item_list.sort((a,b) => a.distance-b.distance);
    this.item_list = this.item_list.slice(0, this.resultQty);
    
  }

  getItemList(){
    return new Promise<any>((resolve, reject) => {
      console.table(this.pageQuery)
      this.querySubscription = this.apollo
        .watchQuery({
          query:this.pageQuery,
        })
        .valueChanges.subscribe((res:any) => {
          console.log(res)
              this.all_data = res.data;            
              this.departments = res.data.departments;
              this.cities = res.data.cities;
              resolve(true)
        },error=>{
           console.log(error)
           this.presentToast("No se pudieron obtener los datos. Verifique su conexión a internet")
           resolve(true)
        });
        
    });
  }
  // change Show style
  changeStyle(){
    // Cambia el estilo de la vista de grid a lista y viceversa
    this.grid_style=(this.grid_style!=true)?true:false;
  }

  filterData(){
   // this.showFilterForm = !this.showFilterForm;
  }

  onchangeDepartment($event){
    this.selected_department = $event;
    this.selected_city = 0;
    this.cities = [];
    this.all_data.cities.forEach(c => {
      if (c.department.id == $event){
        this.cities.push(c);
      }
    });
  }


  onchangeCity($event){
    this.selected_city = $event;
    if (this.selected_department == 0){
      this.all_data.cities.forEach(c => {
        if (c.id == $event){
          this.selected_department = c.department.id;
          this.departmentPlaceholder = c.department.name;
        }
      });
    }
    if(this.selected_city && this.selected_department){
      this.onchangeDepartment(this.selected_department);
      this.selected_city = $event;
    }
  }

  search(){
    this.item_list = [];
    let aux = [];
   
      aux = this.all_data.talleres;
    
    if (this.selected_city != 0 && this.currentPosition){
       
       aux.forEach(e => {
         if (e.city && e.city.id == this.selected_city){
          if (e.location.split(",").length==2){ 
            let lat = parseFloat(e.location.split(",")[0])||0;
            let lng = parseFloat(e.location.split(",")[1])||0;
            e.distance = GlobalsProvider.getDistance(this.currentPosition,
              {lat: lat,lng: lng});
            }else{
              e.distance = 0;
            }
           this.item_list.push(e);
         }
       });
    }else{
      aux.forEach(e => {
        if (e.city.department.id == this.selected_department){
          this.item_list.push(e);
        }
      });
    }
    this.item_list.sort((a,b) => a.distance-b.distance);
    this.item_list = this.item_list.slice(0, this.resultQty);

    //this.showFilterForm = false;
  }
}