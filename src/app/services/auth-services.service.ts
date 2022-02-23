import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private router: Router, private cookieService: CookieService,private toastController: ToastController) { }
  
  CheckAuth(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //console.log("data from check auth" +user.uid);
        //User in session
        
      } else {
        // User is signed out
        // ...
        this.presentToast("This session has expired!! Please login again!"); // call Toast menthod here
        this.router.navigate(['/login']);
      }
      if(this.cookieService.get('%3Fdjasbdyw!kjdnawjb') != user.refreshToken && this.cookieService.get('userID') != user.uid){
        this.presentToast("Security checked!! Please login again!"); // call Toast menthod here
        this.router.navigate(['/login']);
      }
    });
    
  }
    //Toast here
    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
}
