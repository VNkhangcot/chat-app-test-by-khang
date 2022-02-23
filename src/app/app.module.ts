import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {LoadingManagementComponent}from './loading-management/loading-management.component';

//Component
//Custom

const firebaseConfig = {
  apiKey: "AIzaSyBc0_h3-Q-8jEfHQDwaIwuR_M51gUp6WOw",
  authDomain: "ionic-chat-with-firebase.firebaseapp.com",
  projectId: "ionic-chat-with-firebase",
  storageBucket: "ionic-chat-with-firebase.appspot.com",
  messagingSenderId: "483893251032",
  appId: "1:483893251032:web:c22e37c87ab0dc07b180ad",
  measurementId: "G-YXHL2TK22M"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
@NgModule({
  declarations: [AppComponent,LoginComponent, RegisterComponent, LoadingManagementComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  
  
})
export class AppModule {
  
}
