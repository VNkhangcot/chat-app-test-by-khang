import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoadingManagementComponent } from './loading-management/loading-management.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },{
    path: 'loading',
    component: LoadingManagementComponent
  },{
    path: 'chatbox',
    component: ChatboxComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
