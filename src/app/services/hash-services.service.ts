import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class HashProviderService {
  constructor( private cookieService : CookieService) { }
  set( value){
    var key = CryptoJS.enc.Utf8.parse("_hdjkahwbaywcbhwjadiwa784514+46123");
    var iv = CryptoJS.enc.Utf8.parse("_hdjkahwbaywcbhwjadiwa784514+46123");
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    this.cookieService.set('userPasswordLocal', encrypted.toString());//set password to local
    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get( value){
    var key = CryptoJS.enc.Utf8.parse("_hdjkahwbaywcbhwjadiwa784514+46123");
    var iv = CryptoJS.enc.Utf8.parse("_hdjkahwbaywcbhwjadiwa784514+46123");
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
