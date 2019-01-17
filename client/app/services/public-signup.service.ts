import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PublicSignupService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'tokenid': localStorage['tokenid'] });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  signup(user): Observable<any> {
    return this.http.post('/api/public/signup', JSON.stringify(user), this.options).pipe(map(res => res.json()));
  }

}
