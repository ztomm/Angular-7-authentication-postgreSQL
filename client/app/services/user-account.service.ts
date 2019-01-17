import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserAccountService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'tokenid': localStorage['tokenid'] });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUser(data): Observable<any> {
    return this.http.get(`/api/user/account/${data.id}`, this.options).pipe(map(res => res.json()));
  }

  editUser(data): Observable<any> {
    return this.http.put(`/api/user/account/${data.id}`, JSON.stringify(data), this.options).pipe(map(res => res.json()));
  }

}
