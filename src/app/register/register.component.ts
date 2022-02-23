import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
//custom service
import { ToastProviderService } from '../services/toast-provider.service';
import {LoadingProviderService} from '../services/loading-provider.service';
import { HashProviderService } from '../services/hash-services.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  emailClient = "";
  passwordClient = "";
  rePasswordClient = "";
  
  constructor( private cookieService: CookieService, public toastProvider: ToastProviderService, private router: Router, private loadingProvider: LoadingProviderService, private hashProvider: HashProviderService) { }

  ngOnInit() {}



Register(){
    if(this.passwordClient === this.rePasswordClient){
      this.loadingProvider.presentLoading(); // call menthod Loading here
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.emailClient, this.passwordClient)
        .then((userCredential) => {
          // Signed in 
          console.log("User signed");
          //save email and pass to local
          this.cookieService.set('userEmailLocal', this.emailClient);
          this.hashProvider.set(this.passwordClient);
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
