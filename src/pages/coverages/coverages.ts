import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { File } from '@ionic-native/file';


import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Subscription } from 'apollo-client/util/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';


const options: DocumentViewerOptions = {
  title: 'My PDF',
  search: { enabled: true },
  email: { enabled: true },
  print: { enabled: true },
  documentView: { closeLabel: 'Cerrar' },
  navigationView: { closeLabel: 'Cerrar' },
  openWith: {
    enabled: true
  }
}


@IonicPage()
@Component({
  selector: 'page-coverages',
  templateUrl: 'coverages.html',
})
export class CoveragesPage {
  item_list: any = [];
  pageQuery: any;
  title: String;
  querySubscription: Subscription;
  loading: any;

  getURL(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    private file: File,
    private document: DocumentViewer,
    public toastController: ToastController,
    private platform: Platform,
    private iab: InAppBrowser,
    public loadingController: LoadingController,
    private transfer: FileTransfer,
    private sanitizer: DomSanitizer) {

    this.pageQuery = navParams.get('pageQuery');

    if (!this.pageQuery) {
      navCtrl.goToRoot({});
      return
    }
   
    this.title = navParams.get('title')
    this.init();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      content: '',
      spinner: 'bubbles',
      cssClass: 'primary'
    });
    await this.loading.present();
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  init() {
    this.querySubscription = this.apollo.watchQuery({
      query: this.pageQuery,
    })
      .valueChanges.subscribe((res: any) => {
        this.item_list = res.data.coverages;
      },error=>{
        console.log(error)
        this.presentToast("No se pudieron obtener los datos. Verifique su conexión a internet")
     });
  }

  showPdf(url, name) {
    //let url = encondeURIComponent(path);
    this.iab.create('https://docs.google.com/viewer?url=' + url);
  }
  download(url) {
    this.iab.create(url);
  }

  downloadAndOpenPdf(url, name) {
    this.presentLoading();
    // window.open(url, '_blank', 'location=no');
    let path = null;
    if (this.platform.is('os')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;

    }
    const transfer = this.transfer.create();
    transfer.download(url,path+'file.pdf',true).then(entry => {
      this.presentToast(path+'file.pdf');
       this.presentToast("downloaded: "+entry.toURL());
       let url = entry.toURL();
       
       this.document.viewDocument(url,'application/pdf',options,null,this.loading.dismiss());
   }).catch(res=>{
    this.presentToast('no se pudo descargar');
   });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

