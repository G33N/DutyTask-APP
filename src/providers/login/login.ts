import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// Firebase
// import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// Models
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
// Local storage
import { Storage } from '@ionic/storage';

@Injectable()
export class LoginProvider {
  user = {} as User;
  profileRef$: FirebaseObjectObservable<Profile>;
  // private loginErrorString: string;

  constructor(private storage: Storage, public http: Http, private database: AngularFireDatabase, private AngularFireAuth: AngularFireAuth) {

  }

  async login(user: User){
    this.user = user;
    var exit = false;
    try {
      const result = await this.AngularFireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.AngularFireAuth.authState.subscribe(user => {
          if (user) {
            this.profileRef$ = this.database.object(`profile/${user.uid}`);
            this.profileRef$.subscribe(snapshoot => {
              if(snapshoot.username) {
                //this.navCtrl.setRoot(HomePage);
              }
              else {
                //this.navCtrl.setRoot(ProfilePage);
              }
            });
          }
        });
        exit = true
      }
    }
    catch (error) {
      console.log('Login provider error');
      exit =  false;
    }
    return exit
  }
}
