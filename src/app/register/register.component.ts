import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
//custom service
import { AuthServicesService } from '../services/auth-services.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  emailClient = "";
  passwordClient = "";
  rePasswordClient = "";
  
  constructor( private cookieService: CookieService, private router: Router, private authService: AuthServicesService) { }

  ngOnInit() {}

  Register(){
    this.authService.Register(this.emailClient, this.passwordClient, this.rePasswordClient);
  }


}
