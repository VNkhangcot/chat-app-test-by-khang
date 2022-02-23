import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private auth: AuthServicesService) { }
  ngOnInit() {
    //auth
    this.auth.CheckAuth();

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    
  }

}
