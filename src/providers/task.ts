import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from './api';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskProvider {

  data: any;

  constructor(public http: Http, public api: Api) {

  }
  get(user) {
    return new Promise(resolve => {
      this.http.get(this.api.url + '/task/' + user)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  add(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api.url + '/task', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(task) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api.url + '/task/delete/' + task, task)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
