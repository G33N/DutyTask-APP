import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskProvider {

  data: any;
  apiUrl = 'http://192.168.88.166:3002';

  constructor(public http: Http) {

  }
  get() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/task')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  add(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/task', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(task) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/task/delete/' + task, task)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
