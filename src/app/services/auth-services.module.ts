import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServicesService } from './auth-services.service';

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// custom services
import {LoadingProviderService} from '../services/loading-provider.service';
import { ToastProviderService } from '../services/toast-provider.service';
import { HashProviderService } from '../services/hash-services.service';


@NgModule({
  declarations: [AuthServicesService],
  imports: [
    CommonModule,
    Injectable,
    CookieService,
    Router,
    LoadingProviderService,
    ToastProviderService,
    HashProviderService
  ]
})
export class AuthServicesModule { }
