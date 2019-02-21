import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Imports Components
import { FormPokemonComponent } from './form-pokemon/form-pokemon.component';

//Imports HTTP
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Imports Firebase
import { Firebase } from '@ionic-native/firebase/ngx';

@NgModule({
  declarations: [
    AppComponent,
    FormPokemonComponent
  ],
  entryComponents: [
    FormPokemonComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    Firebase,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}