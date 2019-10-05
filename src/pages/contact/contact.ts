import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


interface Response {
  createContact: any;
}

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contact = <any>{}
  myForm: FormGroup;
  data = {}

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,  
    private apollo: Apollo,
    public toastController: ToastController) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  send() {
   
    let mutation =gql`
    mutation {
      createContact(email: "${this.contact.email}",message:"${this.contact.message}") {
        ok
      }
    }
    `
    this.contact.email = "";
    this.contact.message = "";

    this.apollo.mutate({
      mutation: mutation,
    }).subscribe(({ data }) => {
      this.presentToast("Su mensaje ha sido enviado, en breve nos pondremos en contacto con usted.");
    },(error) => {
      this.presentToast("Error al enviar el mensaje. Inténtelo de nuevo mas tarde.")
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}
