import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  rate=4;
  grid_style=true;
  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer) {
  }

   getURL(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  // cars = [
  //   {img:'assets/imgs/products/auto1.png', name:'Yaris',  price:'$15,600 '},
  //   {img:'assets/imgs/products/auto1.png', name:'Corolla',  price:'$19,600'},
  //   {img:'assets/imgs/products/auto1.png', name:'Corolla Hybrid',  price:'$23,100'},
  //   {img:'assets/imgs/products/auto1.png', name:'Corolla Hatchback',  price:'$20,140 '},
  // ]
  cars = [
    {img:'assets/imgs/products/auto1.jpeg',name:'Yaris',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$15,600 '},
    {img:'assets/imgs/products/auto2.jpeg',name:'Corolla',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$19,600'},
    {img:'assets/imgs/products/auto3.jpeg',name:'Corolla Hybrid',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$23,100'},
    {img:'assets/imgs/products/auto4.jpeg',name:'Corolla Hatchback',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$20,140 '},
 {img:'assets/imgs/products/auto1.jpeg',name:'Yaris',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$15,600 '},
    {img:'assets/imgs/products/auto2.jpeg',name:'Corolla',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$19,600'},
    {img:'assets/imgs/products/auto3.jpeg',name:'Corolla Hybrid',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$23,100'},
    {img:'assets/imgs/products/auto4.jpeg',name:'Corolla Hatchback',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$20,140 '},
 {img:'assets/imgs/products/auto1.jpeg',name:'Yaris',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$15,600 '},
    {img:'assets/imgs/products/auto2.jpeg',name:'Corolla',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$19,600'},
    {img:'assets/imgs/products/auto3.jpeg',name:'Corolla Hybrid',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$23,100'},
    {img:'assets/imgs/products/auto4.jpeg',name:'Corolla Hatchback',certificate:'Certified Dermatologist',phone:'123-456-789-1245',address:'24 Freedom Street , New york',  price:'$20,140 '},

  ]    
  // bookmark function
  bookmark(item,$event){
    item.press_mark=(item.press_mark!=true)?true:false;
    $event.stopPropagation();
  }   
  // change Show style
  changeStyle(){
    this.grid_style=(this.grid_style!=true)?true:false;
  }
}
