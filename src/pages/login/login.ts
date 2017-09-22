import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

// Pages
import { HomePage } from '../../pages/home/home';
import { ProfilePage } from '../../pages/profile/profile';
// Firebase
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// Local storage
import { Storage } from '@ionic/storage';
// Models
import { User } from '../../models/user';
import { Profile } from '../../models/profile';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  profileRef$: FirebaseObjectObservable<Profile>;
  user = { email: 'mceliz@enlaceit.com.ar', password: 'Seighei7' } as User;

  // Our translated text strings
  private loginErrorString: string;

  constructor(private storage: Storage, private database: AngularFireDatabase, private AngularFireAuth: AngularFireAuth, public navCtrl: NavController, public toastCtrl: ToastController) {

    this.loginErrorString = 'Login fail';
  }

  // Attempt to login in through our User service
  async doLogin(user: User) {
    try {
      const result = await this.AngularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      // Save currentUser to local store
      const currentUser = firebase.auth().currentUser;
      this.storage.set('user', currentUser);
      //Send email verification when user login
      if (!currentUser.emailVerified) {
        currentUser.sendEmailVerification().then(() => {
          console.log('Mail enviado')
        });
      }
      if (result) {
        this.AngularFireAuth.authState.subscribe(user => {
          if (user) {
            this.profileRef$ = this.database.object(`profile/${user.uid}`);
            this.profileRef$.subscribe(snapshoot => {
              if(snapshoot.username) {
                this.navCtrl.setRoot(HomePage);
              }
              else {
                this.navCtrl.setRoot(ProfilePage);
              }
            });
          }
        });
      }
    }
    catch (error) {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
  async recoverPassword(user: User) {
    var auth = firebase.auth();
    var emailAddress = user.email;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      console.log('Email sended');
      this.navCtrl.pop();
    }).catch(function(error) {
      // An error happened.
      console.log('Something happened trying sended the email');
    });
  }

}
