import { Routes } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

export const routes: Routes = [
    { path: '', component: AdminDashboardComponent },
    { path: 'users', component: AdminUserComponent },
];