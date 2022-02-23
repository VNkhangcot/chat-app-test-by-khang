import { Component, OnInit } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import { CookieService } from 'ngx-cookie-service';
// custom services
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  constructor(public authenticationService: AuthServicesService, private cookieService: CookieService) { }

  public emailClient  ="";
  public passwordClient  ="" ;
  //Sign in here
  Login(){
    this.authenticationService.Login(this.emailClient, this.passwordClient);
    
  }

  ngOnInit() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.emailClient = this.cookieService.get('userEmailLocal');
    
    //this.passwordClient = this.hashProvider.get(this.cookieService.get('userPasswordLocal'));
  }

}
