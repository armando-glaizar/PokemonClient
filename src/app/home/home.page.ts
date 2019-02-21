import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormPokemonComponent } from '../form-pokemon/form-pokemon.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemons: any;
  ref = firebase.database().ref();

  constructor(public modalController: ModalController, private alertController: AlertController) {
    this.ref.on('value', response => {
      let data = snapshotToArray(response);
      this.pokemons = data;
    });
  }

  async delete(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea eliminar el Pokemon?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, 
        {
          text: 'Aceptar',
          handler: () => { firebase.database().ref(id).remove(); }
        }
      ]
    });

    await alert.present();
  }

  async create() {
    const modal = await this.modalController.create({
      component: FormPokemonComponent
    });

    return await modal.present();
  }

  async update(id: string) {
    const modal = await this.modalController.create({
      component: FormPokemonComponent,
      componentProps: { id: id }
    });

    return await modal.present();
  }
}


export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    
    returnArr.push(item);
  });

  return returnArr;
}