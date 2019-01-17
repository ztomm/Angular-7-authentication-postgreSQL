import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { Page404Component } from './page404/page404.component';

import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { AuthGuardLoginService } from './services/auth-guard-login.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'page404', component: Page404Component },
  { path: 'admin', loadChildren: './_admin/admin.module#AdminModule', canActivate: [AuthGuardAdminService] },
  { path: 'user', loadChildren: './_user/user.module#UserModule', canActivate: [AuthGuardLoginService] },
  { path: '**', redirectTo: '/page404' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
