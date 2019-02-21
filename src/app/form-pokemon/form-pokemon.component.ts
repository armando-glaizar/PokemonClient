import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-form-pokemon',
  templateUrl: './form-pokemon.component.html',
  styleUrls: ['./form-pokemon.component.scss']
})
export class FormPokemonComponent implements OnInit {
  pokemon = { name: "", type: "", zone: "", generation: "" }
  idPokemon: string;
  ref = firebase.database().ref();
  
  constructor(public modalController: ModalController, private navParams: NavParams) { 
    
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    if(this.navParams.get('id')) {
      this.idPokemon = this.navParams.get('id');

      firebase.database().ref(this.idPokemon).on('value', response => {
        this.pokemon = snapshotToArrayObject(response);
      });
    }
  }

  create() {
    let insert = this.ref.push();
    insert.set(this.pokemon);
    this.modalController.dismiss();
  }

  update() {
    let data = this.pokemon;
    firebase.database().ref(this.idPokemon).update(data);
    this.modalController.dismiss();
  }
}


export const snapshotToArrayObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}