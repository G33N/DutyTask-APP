import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  data: any;
  apiUrl = 'http://192.168.88.166:3002';

  constructor(public http: Http) {
  }

  signup(user){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/user', user)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
