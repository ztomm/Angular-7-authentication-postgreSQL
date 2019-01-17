import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { ToastComponent } from '../../shared/toast/toast.component';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  currentUser = {};

  user = {};
  isLoading = true;
  isAdmin = false;

  editDataForm: FormGroup;
  email = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  password = new FormControl('');

  constructor(
    private authService: AuthService,
    private userAccountService: UserAccountService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getDatas();
    this.editDataForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  getDatas() {
    this.userAccountService.getUser(this.authService.currentUser).subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
          res.data.password = '';
          this.user = res.data;
          if(this.user["roleId"] == 3){
            this.isAdmin = true;
          }
        }
      },
      async error => {
        let errorBody = JSON.parse(error._body);
        let e = true;
        if(errorBody.tokenObj) e = await this.authService.handleToken(errorBody.tokenObj);
        if(e){
          //...
        }
      },
      () => this.isLoading = false
    );
  }

  editData() {
    this.editDataForm.value.id = this.user["id"];
    if(this.editDataForm.value.password != '' && this.editDataForm.value.password.length < 4){
      this.toast.setMessage('password to short!', 'danger');
      return false;
    }
    this.userAccountService.editUser(this.editDataForm.value).subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
        this.toast.setMessage('account settings saved!', 'success')
        }
      },
      error => {
        if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
      }
    );
  }

}
