import { Component } from '@angular/core';
import {  Router,NavigationEnd } from '@angular/router';
import { AuthServicesService } from './services/auth-services.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  isAuthenticated = false;
  name = 'Get Current Url Route Demo';
  currentRoute: string = window.location.pathname;
  constructor(private router: Router ,public authService: AuthServicesService, private cookieService: CookieService) {
    
    
    // this.router.events.(event => event instanceof NavigationEnd)
    //       .subscribe(event => 
    //        {
    //           this.currentRoute = event.url;          
    //           console.log(event);
    //        });

  }
  ngOnInit() {
    if(this.cookieService.get('isAuthentication') == "yes" ){
      this.isAuthenticated = true;
    }else{
      this.isAuthenticated = false;
    }
  }



}
