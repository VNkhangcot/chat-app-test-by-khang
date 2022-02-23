import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastProviderService {

  constructor(private ToastProviderService: ToastController) { }

  //Toast here
  async presentToast(message) {
    const toast = await this.ToastProviderService.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
