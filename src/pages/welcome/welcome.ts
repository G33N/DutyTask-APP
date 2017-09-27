import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
// Pages
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
//  Providers
import { LoginProvider } from '../../providers/login/login';
// Local storage
import { Storage } from '@ionic/storage';
// Firebase
// import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
// Facebook
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  localUser: any;

  constructor(private facebook: Facebook, private storage: Storage, public navCtrl: NavController, private AngularFireAuth: AngularFireAuth, private LoginProvider: LoginProvider, public toastCtrl: ToastController) {
    // Get local user to login
    this.storage.get('user').then((val) => {
      //this.checkLogin(val);
    });
  }

  ionViewDidLoad() {
    //this.navCtrl.setRoot(HomePage);
  }

  checkLogin(localUser) {
    if (localUser) {
      // console.log(localUser);
      const result = this.LoginProvider.login(localUser);
      console.log(result);
      if (result)
        this.navCtrl.setRoot(HomePage);
    }
    else {
      console.log('Notting happen here')
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

    async facebookLogin() {
    // var provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    //   this.navCtrl.setRoot(HomePage);
    // }).catch(() => {
    //   // Handle Errors here.
    //   let toast = this.toastCtrl.create({
    //     message: 'Authentication error',
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });

    // this.facebook.login(["email"]).then((loginResponse) => {
    //   let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
    //   firebase.auth().signInWithCredential(credential).then((info) => {
    //     console.log(JSON.stringify(info));
    //   });
    // });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
