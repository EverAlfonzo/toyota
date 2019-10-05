import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';

declare var Connection;

@Injectable()
/*
  Generated class for the ConnectivityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectivityProvider {

  internetStatus: boolean = false;

  constructor(public http: HttpClient) {
    this.verifyConnection();
  }

  verifyConnection(){
    
    if (Network.type === 'none') {
      this.internetStatus = false;
    }

    Network.onDisconnect().subscribe(() => {
      this.internetStatus = false;
    });

    Network.onConnect().subscribe(() => {
      this.internetStatus = true;
    });
    
  }

  isOnline(): boolean {
    return this.internetStatus;
  }

  isOffline():boolean{
    return !this.internetStatus;
  }
}
