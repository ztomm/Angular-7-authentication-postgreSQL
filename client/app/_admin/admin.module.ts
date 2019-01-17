import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './admin.routes';

import { SharedModule } from '../shared/shared.module';

import { AdminUserService } from '../services/admin-user.service';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminUserComponent,
  ],
  providers: [
    AdminUserService,
  ],
  exports: [RouterModule]
})
export class AdminModule { }
