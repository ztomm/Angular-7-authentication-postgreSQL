import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './app.routes';

import { SharedModule } from './shared/shared.module';

import { AuthService } from './services/auth.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { AuthGuardLoginService } from './services/auth-guard-login.service';

import { PublicHomeService } from './services/public-home.service';
import { PublicLoginService } from './services/public-login.service';
import { PublicLogoutService } from './services/public-logout.service';
import { PublicSignupService } from './services/public-signup.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  imports: [
    BrowserModule,
    RoutingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    Page404Component
  ],
  providers: [
    AuthService,
    AuthGuardLoginService,
    AuthGuardAdminService,
    PublicHomeService,
    PublicLoginService,
    PublicLogoutService,
    PublicSignupService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
