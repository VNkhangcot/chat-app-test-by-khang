import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  emailClient = "";
  passwordClient = "";
  
  constructor(public loadingController: LoadingController, public toastController: ToastController, private router: Router) { }

  ngOnInit() {}



Register(){
  this.presentLoading(); // call menthod Loading here
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, this.emailClient, this.passwordClient)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User signed");
      this.router.navigate(['/login'])
      this.presentToast("Registered!!"); // call Toast menthod here
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      this.presentToast("Please check your email or password!"); // call Toast menthod here
      // ..
    });
}

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
  //Toast here
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
