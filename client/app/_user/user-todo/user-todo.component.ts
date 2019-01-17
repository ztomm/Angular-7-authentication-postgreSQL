import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { ToastComponent } from '../../shared/toast/toast.component';

import { UserTodoService } from '../../services/user-todo.service';

@Component({
  selector: 'app-user-todo',
  templateUrl: './user-todo.component.html',
  styleUrls: ['./user-todo.component.scss']
})
export class UserTodoComponent implements OnInit {

  data = {};
  datas = [];
  isLoading = true;
  isEditing = false;

  addDataForm: FormGroup;
  active = new FormControl('', Validators.required);
  title = new FormControl('', Validators.required);
  deadline = new FormControl('', Validators.required);
  done = new FormControl('', Validators.required);

  constructor(
    private authService: AuthService,
    private userTodoService: UserTodoService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getDatas();
    this.addDataForm = this.formBuilder.group({
      active: this.active,
      title: this.title,
      deadline: this.deadline,
      done: this.done
    });
  }

  getDatas() {
    this.userTodoService.getTodos().subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
          this.datas = res.data;
        }
      },
      error => {
        if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
      },
      () => this.isLoading = false
    );
  }

  addData() {
    this.userTodoService.addTodo(this.addDataForm.value).subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
          this.datas.push(res.data);
          this.addDataForm.reset();
          this.toast.setMessage('item added successfully.', 'success');
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
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getDatas();
  }

  editData(data) {
    this.userTodoService.editTodo(data).subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
        if(e){
          this.isEditing = false;
          this.data = res.data;
          this.toast.setMessage('item edited successfully.', 'success');
        }
      },
      error => {
        if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
      }
    );
  }

  deleteData(data) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.userTodoService.deleteTodo(data).subscribe(
        async res => {
          let e = true;
          if(res.tokenObj) e = await this.authService.handleToken(res.tokenObj);
          if(e){
            const pos = this.datas.map(elem => elem.id).indexOf(data.id);
            this.datas.splice(pos, 1);
            this.toast.setMessage('item deleted successfully.', 'success');
          }
        },
        error => {
          if(JSON.parse(error._body).parent.code == '23503') this.toast.setMessage('can\'t delete. Data related to others.', 'danger');
          if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
        }
      );
    }
  }

}
