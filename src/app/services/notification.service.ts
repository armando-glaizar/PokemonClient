import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public firebase: Firebase) {

  }

  subscribePokemons() {
    this.firebase.subscribe('Pokemons')
      .then(response => {
        console.log(response);
      });
  }

  listenNotifications() {
    return this.firebase.onNotificationOpen();
  }
}