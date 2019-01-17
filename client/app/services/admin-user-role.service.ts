import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminUserRoleService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'tokenid': localStorage['tokenid'] });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUserRoles(): Observable<any> {
    return this.http.get('/api/admin/user-roles', this.options).pipe(map(res => res.json()));
  }

  getUserRole(data): Observable<any> {
    return this.http.get(`/api/admin/user-roles/${data.id}`, this.options).pipe(map(res => res.json()));
  }

  countUserRole(): Observable<any> {
    return this.http.get('/api/admin/user-roless/count', this.options).pipe(map(res => res.json()));
  }

  addUserRole(data): Observable<any> {
    return this.http.post('/api/admin/user-roles', JSON.stringify(data), this.options).pipe(map(res => res.json()));
  }

  editUserRole(data): Observable<any> {
    return this.http.put(`/api/admin/user-roles/${data.id}`, JSON.stringify(data), this.options).pipe(map(res => res.json()));
  }

  deleteUserRole(data): Observable<any> {
    return this.http.delete(`/api/admin/user-roles/${data.id}`, this.options).pipe(map(res => res.json()));
  }
  
}
