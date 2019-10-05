import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppModules } from '../providers/globals/globals';
import { UserService } from '../providers/services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
     
  //rootPage: any = 'HomePage';
  rootPage: any = 'LoginPage';
  pages: Array<string>;
  user: any;
  public alertShown:boolean = false;
  public animateVarible:boolean=false;

  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public userService: UserService,
              public storage: Storage,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController) {
    this.initializeApp();
    // used for an example of ngFor and navigation  
    
  }  
  
  

  initializeApp() {  
    
    this.storage.get('user').then(value =>{
      this.user = value;
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
     // this.nav.setRoot('FindItemPage');
      //this.statusBar.styleDefault();
      this.statusBar.styleDefault();
        this.splashScreen.hide();
        
      this.statusBar.backgroundColorByName('#2d2c6e');
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        this.userService.authenticationState.subscribe(state => {
          console.log(state, "stateee")
          if (state) {
            this.nav.setRoot('MenuPage');
          } else {
            this.nav.setRoot('LoginPage');
          }
        });
        

      });

      this.platform.registerBackButtonAction(() => {
        if (this.alertShown==false) {
          this.presentConfirm();  
        }
      }, 0)
      
    });
  }

  doLogout() {
    this.userService.logout();
  }

 

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Salir',
      message: '¿Desea salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.alertShown=false;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }


  

  shownGroup = null;

  getModuleByCode(code){
    let page: any = null;
    Object.keys(AppModules).forEach(element => {
        if (AppModules[element].code == code){
          page = AppModules[element];
        }
    });
  
    
    if (!page){
    page =  { code:'contact',title: 'Contacto', component: 'ContactPage'}
   }
    return page;
  }
  openPage(code) {
    let page = this.getModuleByCode(code);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,
      {
        pageQuery:page.query,
        title:page.title,
        moduleName:page.code,
        
      });
    if(page=='SignInPage'){
      this.shownGroup = null;
    }
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
    }

}
