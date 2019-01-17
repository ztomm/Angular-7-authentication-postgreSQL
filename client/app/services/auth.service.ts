import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as JwtDecode from "jwt-decode";

import { PublicLoginService } from './public-login.service';
import { PublicLogoutService } from './public-logout.service';

import { ToastComponent } from '../shared/toast/toast.component';

@Injectable()
export class AuthService {
  
  loggedIn = false;
  isAdmin = false;
  private token = '';
  private tokenId = '';

  jwtdecode: JwtDecode = new JwtDecode();

  currentUser = { id: 0, username: '', roleId: 0, loggedIn: false };

  constructor(
    private publicLoginService: PublicLoginService,
    private publicLogoutService: PublicLogoutService,
    private router: Router,
    public toast: ToastComponent
  ){
    this.token = this.getLocalToken('token');
    this.tokenId = this.getLocalToken('tokenid');
    if (this.token && this.token != '') {
      const decodedUser = this.decodeUserFromToken(this.token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(data) {
    this.publicLoginService.login(data).subscribe(
      res => {
        this.setLocalToken('token',res.tokenObj.token);
        this.setLocalToken('tokenid',res.tokenObj.tokenId);
        this.token = this.getLocalToken('token');
        this.tokenId = this.getLocalToken('tokenid');
        const decodedUser = this.decodeUserFromToken(this.token);
        this.setCurrentUser(decodedUser);
        location.reload();
        //this.router.navigate(['/']);
      },
      error => {
        this.toast.setMessage('invalid email or password!', 'danger');
      }
    );
  }

  logout() {
    let data = {};
    this.publicLogoutService.logout(data).subscribe(
      res => {
        this.removeLocalToken('token');
        this.removeLocalToken('tokenid');
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = { id: 0, username: '', roleId: 0, loggedIn: false };
        this.router.navigate(['/']);
      },
      error => {
        this.toast.setMessage('logout failed!', 'danger');
      }
    );
    
  }

  decodeUserFromToken(token) {
    token = this.jwtdecode.decodeToken(token);
    if(!token.id) token.id = 0;
    return token;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(decodedUser) {
    this.currentUser.id = decodedUser.id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.roleId = decodedUser.roleId;
    this.loggedIn = decodedUser.loggedIn;
    decodedUser.roleId === 3 ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.roleId;
  }

  getLocalToken(id) {
    let token = localStorage.getItem(id);
    if (typeof token === 'undefined' || token === null) token = '';
    return token;
  }

  setLocalToken(id, value) {
    localStorage.setItem(id, value);
  }

  removeLocalToken(id) {
    localStorage.removeItem(id);
  }

  handleToken(tokenObj){
    if(tokenObj.action){
      for (let a of tokenObj.action) {
        if(a[0] == 'logout'){
          this.logout();
        }
        if(a[0] == 'redirect'){
          this.router.navigate([a[1]]);
          return false;
        }
        if(a[0] == 'setNewToken'){
          this.setLocalToken('token',a[1]);
          this.setCurrentUser(this.decodeUserFromToken(a[1]));
        }
        if(a[0] == 'setNewTokenId'){
          this.setLocalToken('tokenid',a[1]);
        }
        if(a[0] == 'renewToken'){
          this.setLocalToken('token',a[1]);
          this.setCurrentUser(this.decodeUserFromToken(a[1]));
        }
        if(a[0] == 'renewTokenId'){
          this.setLocalToken('tokenid',a[1]);
        }
        if(a[0] == 'return'){
          return a[1];
        }
      }
    }
    return true;
  }

}
