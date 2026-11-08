import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Gallery } from './pages/gallery/gallery';
import { Explore } from './pages/explore/explore';
import { Tools } from './pages/tools/tools';
import { Workspace } from './pages/workspace/workspace';
import { Upload } from './pages/upload/upload';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,         
    children: [
      { path: '', component: Home },
      { path: 'gallery', component: Gallery },
      { path: 'explore', component: Explore },
      { path: 'dashboard/tools', component: Tools },
      { path: 'dashboard/workspaces', component: Workspace },
      { path: 'upload', component: Upload },
    ],
  },
  { path: 'login', component: Login },    
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' },        
];
