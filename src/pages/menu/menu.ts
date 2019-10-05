import { IonicPage, NavController,ToastController, Nav } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AppModules } from '../../providers/globals/globals';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  items = ['item 1','item 2','item3']

  constructor(public navCtrl: NavController  ) {

   
  }

  getModuleByCode(code){
    let page: any = null;
    Object.keys(AppModules).forEach(element => {
        if (AppModules[element].code == code){
          page = AppModules[element];
        }
    });
    if (code == 'article-details'){
      page =  { code:'article-details',title: 'Consejo del Dia', component: 'ArticleDetailsPage'}
    }
    
   if(!page){
    page =  { code:'contact',title: 'Contacto', component: 'ContactPage'}
   }
    return page;
  }
  
  openPage(code) {
    let page = this.getModuleByCode(code);

    this.navCtrl.push(page.component, {
      pageQuery:page.query,
      title:page.title,
      moduleName:page.code
    });
  }



}
