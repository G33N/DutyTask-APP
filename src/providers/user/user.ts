import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  data: any;

  constructor(public http: Http, public api: Api, private storage: Storage) {

  }

  signup(user){
    return new Promise((resolve, reject) => {
      this.http.post(this.api.url + '/signup', user)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  login(user){
    return new Promise((resolve, reject) => {
      this.http.post(this.api.url + '/login', user).map(res => res.json())
        .subscribe(res => {
          // set a key/value
          this.storage.set('_id', res._id);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
