import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// custom services
import {LoadingProviderService} from '../services/loading-provider.service';
import { ToastProviderService } from '../services/toast-provider.service';
import { HashProviderService } from '../services/hash-services.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private hashProvider : HashProviderService,private router: Router, private cookieService: CookieService,private toastProvider: ToastProviderService, private loadingProvider : LoadingProviderService) { }

  //check for Security
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
        this.toastProvider.presentToast("This session has expired!! Please login again!"); // call Toast menthod here
        this.router.navigate(['/login']);
      }
      if(this.cookieService.get('%3Fdjasbdyw!kjdnawjb') != user.refreshToken && this.cookieService.get('userID') != user.uid){
        this.toastProvider.presentToast("Security checked!! Please login again!"); // call Toast menthod here
        this.router.navigate(['/login']);
      }
    });
    
  }

  //Login menthod
    Login(emai, password){
      this.loadingProvider.presentLoading(); //call loading menthod here
      const auth = getAuth();
      signInWithEmailAndPassword(auth, emai, password)
        .then((userCredential) => {
          // Signed in 
          this.toastProvider.presentToast("Signed in successfully"); // call Toast menthod here
          const user = userCredential.user;
          this.cookieService.set('userID', user.uid);
          this.cookieService.set('?djasbdyw!kjdnawjb', user.refreshToken);
          this.cookieService.set('userDisplayName', user.displayName);
          this.cookieService.set('isAuthentication', "yes");
          this.router.navigate(['/folder/Inbox']);
          
          //Debug here
          console.log(user);
          //console.log("email:" + this.emailClient + " password:" + this.passwordClient);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode ==="auth/wrong-password"){
            this.toastProvider.presentToast("False!! Please check your password!"); // call Toast menthod here
          }else if(errorCode ==="auth/user-not-found"){
            this.toastProvider.presentToast("User dose not exits!! Please check your Email");// call Toast menthod here  
          }else if(errorCode ==="auth/invalid-email"){
            this.toastProvider.presentToast("Invalid Email!! Please check your Email");// call Toast menthod here   
          }else{
            this.toastProvider.presentToast("Some thing wrong!! Please try again later"); // call Toast menthod here    
          }
          //Debug here
          //console.log(errorMessage);
          console.log("error Code: " + errorCode);
          //console.log("email:" + this.emailClient + " password:" + this.passwordClient);
        });
    }
    //Register here
    Register(email, password, repassword) {
      if(password=== repassword){
        this.loadingProvider.presentLoading(); // call menthod Loading here
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            console.log("User signed");
            //save email and pass to local
            this.cookieService.set('userEmailLocal', email);
            this.hashProvider.set(password);
            this.router.navigate(['/login']); // redirect to Login page
            this.toastProvider.presentToast("Registered!!"); // call Toast menthod here
            
          })
          .catch((error) => {
            const errorCode = error.code;
            if(errorCode ==="auth/invalid-email"){
              this.toastProvider.presentToast("Invalid Email!!! Please check your Email!"); // call Toast menthod here  
            }else if(errorCode==="email-already-in-use"){
              this.toastProvider.presentToast("Email already in use!!! Please chose another Email!"); // call Toast menthod here    
            }else if(errorCode ==="auth/weak-password"){
              this.toastProvider.presentToast("Your password too weak!!! Please try again!"); // call Toast menthod here      
            }else{
              this.toastProvider.presentToast("Something wrong!!! Please try again later"); // call Toast menthod here
            }
  
            //Debug here
            console.log(errorCode)
            // ..
          });
        }else{
          this.toastProvider.presentToast("Password and Re-password dose not match! Please try again!"); // call Toast
        }
      }

}
