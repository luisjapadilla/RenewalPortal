import { Routes } from '@angular/router';
import { VerifyComponent } from './components/verify-component/verify-component';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // `/`
  { path: 'verify', component: VerifyComponent }, // `/verify`
];
