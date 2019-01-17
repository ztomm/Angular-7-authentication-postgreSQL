import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminUserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'tokenid': localStorage['tokenid'] });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUsers(): Observable<any> {
    return this.http.get('/api/admin/users', this.options).pipe(map(res => res.json()));
  }

  countUsers(): Observable<any> {
    return this.http.get('/api/admin/users/count', this.options).pipe(map(res => res.json()));
  }

  addUser(data): Observable<any> {
    return this.http.post('/api/admin/user', JSON.stringify(data), this.options).pipe(map(res => res.json()));
  }

  getUser(data): Observable<any> {
    return this.http.get(`/api/admin/user/${data.id}`, this.options).pipe(map(res => res.json()));
  }

  editUser(data): Observable<any> {
    return this.http.put(`/api/admin/user/${data.id}`, JSON.stringify(data), this.options).pipe(map(res => res.json()));
  }

  deleteUser(data): Observable<any> {
    return this.http.delete(`/api/admin/user/${data.id}`, this.options).pipe(map(res => res.json()));
  }

}
