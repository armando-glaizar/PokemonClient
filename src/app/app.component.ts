import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NotificationService } from './services/notification.service';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCjvHPJZ7F6n8ie4_mxXjOCyNMOGCfImgg",
  authDomain: "pokemon-92e94.firebaseapp.com",
  databaseURL: "https://pokemon-92e94.firebaseio.com",
  projectId: "pokemon-92e94",
  storageBucket: "pokemon-92e94.appspot.com",
  messagingSenderId: "344601852754",
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationService: NotificationService,
    public alert: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    firebase.initializeApp(config);
    this.notificationService.subscribePokemons();

    this.notificationService.listenNotifications()
      .subscribe(response => {
        console.log(response);
        this.notification(response);
      });
  }

  async notification(response: any) {
    const alert = await this.alert.create({
      header: 'Notificación',
      subHeader: response.title,
      message: response.body,
      buttons: ['Okay']
    });

    await alert.present();
  }
}