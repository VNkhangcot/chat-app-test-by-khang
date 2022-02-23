import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// custom services
import {LoadingProviderService} from '../services/loading-provider.service';
import { ToastProviderService } from '../services/toast-provider.service';
import { HashProviderService } from '../services/hash-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  constructor(private hashProvider: HashProviderService,public navctl : NavController, public loadingProvider : LoadingProviderService, public toastProvider : ToastProviderService, private router: Router, private cookieService: CookieService) { }

  public emailClient  ="";
  public passwordClient  ="" ;
  //Sign in here
  Login(){
    this.loadingProvider.presentLoading(); //call loading menthod here
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.emailClient, this.passwordClient)
      .then((userCredential) => {
        // Signed in 
        this.toastProvider.presentToast("Signed in successfully"); // call Toast menthod here
        const user = userCredential.user;
        this.cookieService.set('userID', user.uid);
        this.cookieService.set('?djasbdyw!kjdnawjb', user.refreshToken);
        this.cookieService.set('userDisplayName', user.displayName);
        
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



  ngOnInit() {
    this.emailClient = this.cookieService.get('userEmailLocal');
    //this.passwordClient = this.hashProvider.get(this.cookieService.get('userPasswordLocal'));
  }

}
