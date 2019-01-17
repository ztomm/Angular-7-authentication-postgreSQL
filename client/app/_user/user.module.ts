import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './user.routes';

import { SharedModule } from '../shared/shared.module';

import { UserAccountService } from '../services/user-account.service';

import { UserComponent } from './user.component';

import { UserAccountComponent } from './user-account/user-account.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserTodoComponent } from './user-todo/user-todo.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserComponent,
    UserAccountComponent,
    UserDashboardComponent,
    UserTodoComponent,
  ],
  providers: [
    UserAccountService,
  ],
  exports: [RouterModule]
})
export class UserModule { }
