import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  constructor(public navctl : NavController, public loadingController: LoadingController, public toastController: ToastController) { }

  public emailClient  ="";
  public passwordClient  ="" ;
  //Loading screen
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
  //Sign in here
  Login(){
    this.presentLoading(); //call loading menthod here
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.emailClient, this.passwordClient)
      .then((userCredential) => {
        // Signed in 
        this.presentToast("Signed in successfully"); // call Toast menthod here
        const user = userCredential.user;
        console.log(user);
        console.log("email:" + this.emailClient + " password:" + this.passwordClient);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.presentToast("False!! Please check your emai and password!"); // call Toast menthod here
        console.log(errorMessage);
        console.log("email:" + this.emailClient + " password:" + this.passwordClient);
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



  ngOnInit() {}

}
