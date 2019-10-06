import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Camera } from '@ionic-native/camera'; 

// Apollo
import { GraphQLModule } from "./graphql.module";
import { Geolocation } from '@ionic-native/geolocation';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';


import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { UserService } from '../providers/services/user.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ServiceService } from '../providers/services/service.service';


export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['localhost:5000']
  }
}

/* config IOS 
var config = {
  backButtonText: '',
  backButtonIcon: 'ios-arrow-back',
  iconMode: 'ios',
  mode:'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  pageTransition: 'ios'
};
*/

var config = {
  backButtonText: '',
  backButtonIcon: 'md-arrow-back',
  iconMode: 'md',
  mode:'md',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  pageTransition: 'md'
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,config),
    Ionic2RatingModule, // Put ionic2-rating module here
    GraphQLModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    }),
    ionicGalleryModal.GalleryModalModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    UserService,
    ServiceService,
    Geolocation,
    StatusBar,    
    SplashScreen,Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    ConnectivityProvider,
    File,
    FileTransfer,
        DocumentViewer,
    InAppBrowser
  ]
})
export class AppModule {}
