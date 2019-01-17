import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserTodoService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'tokenid': localStorage['tokenid'] });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getTodos(): Observable<any> {
    return this.http.get('/api/user/todos', this.options).pipe(map(res => res.json()));
  }

  countTodos(): Observable<any> {
    return this.http.get('/api/user/todos/count', this.options).pipe(map(res => res.json()));
  }

  addTodo(data): Observable<any> {
    return this.http.post('/api/user/todo', JSON.stringify(data), this.options).pipe(map(res => res.json()));
  }

  getTodo(data): Observable<any> {
    return this.http.get(`/api/user/todo/${data.id}`, this.options).pipe(map(res => res.json()));
  }

  editTodo(data): Observable<any> {
    return this.http.put(`/api/user/todo/${data.id}`, JSON.stringify(data), this.options).pipe(map(res => res.json()));
  }

  deleteTodo(data): Observable<any> {
    return this.http.delete(`/api/user/todo/${data.id}`, this.options).pipe(map(res => res.json()));
  }

}
