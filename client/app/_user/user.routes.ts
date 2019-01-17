import { Routes } from '@angular/router';

import { UserAccountComponent } from './user-account/user-account.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserTodoComponent } from './user-todo/user-todo.component';

export const routes: Routes = [
    { path: '', component: UserDashboardComponent },
    { path: 'account', component: UserAccountComponent },
    { path: 'todo', component: UserTodoComponent },
];