import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { ToastComponent } from '../../shared/toast/toast.component';

import { AdminUserService } from '../../services/admin-user.service';
import { AdminUserRoleService } from '../../services/admin-user-role.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  data = {};
  datas = [];
  userRoles = [];
  isLoading = true;
  isEditing = false;
  
  addDataForm: FormGroup;
  active = new FormControl(1, Validators.required);
  username = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  email = new FormControl('', [Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
                                  Validators.minLength(4)]);
  roleId = new FormControl(1, Validators.required);

  constructor(
    private authService: AuthService,
    private adminUserService: AdminUserService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getDatas();
    this.addDataForm = this.formBuilder.group({
      active: this.active,
      username: this.username,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
    });
  }
  
  getDatas() {
    this.adminUserService.getUsers().subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
          this.datas = this.dataReadable(res.data);
        }
      },
      error => {
        if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
      },
      () => this.isLoading = false
    );
  }

  addData() {
    this.adminUserService.addUser(this.addDataForm.value).subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
          this.datas.push(res.data);
          this.datas = this.dataReadable(this.datas);
          this.addDataForm.reset();
          this.toast.setMessage('data added successfully.', 'success');
        }
      },
      error => {
        if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
      }
    );
  }

  enableEditing(data) {
    this.isEditing = true;
    this.data = data;
  }

  cancelEditing() {
    this.isEditing = false;
    this.data = {};
    this.toast.setMessage('data editing cancelled.', 'warning');
    // reload the datas to reset the editing
    this.getDatas();
  }

  editData(data) {
    this.adminUserService.editUser(data).subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
          this.isEditing = false;
          this.data = this.dataReadable(res.data);
          this.getDatas();
          this.toast.setMessage('data edited successfully.', 'success');
        }
      },
      error => {
        if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
      }
    );
  }

  deleteData(data) {
    if (window.confirm('Are you sure you want to permanently delete this data?')) {
      this.adminUserService.deleteUser(data).subscribe(
        res => {
          const pos = this.datas.map(elem => elem.id).indexOf(data.id);
          this.datas.splice(pos, 1);
          this.toast.setMessage('data deleted successfully.', 'success');
        },
        error => {
          if(JSON.parse(error._body).parent.code == '23503') this.toast.setMessage('can\'t delete. Data related to others.', 'danger');
          if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
        }
      );
    }
  }

  toggleData(field, data) {
    if (field == 'active') {
      alert('');
      if (data.active == '0') data.active = '1';
      else data.active = '0';
      this.editData(data);
    }
  }

  dataReadable(data) {
    for(let x = 0; x < data.length; x++){
      data[x].password = '';
      data[x].activeReadable = 'false';
      if(data[x].active == '1'){
        data[x].activeReadable = 'true';
      }
      data[x].roleIdReadable = '';
      for(let y = 0; y < this.userRoles.length; y++){
        if(data[x].roleId == this.userRoles[y].id){
          data[x].roleIdReadable = this.userRoles[y].role;
        }
      }
    }
    return data;
  }

}
