import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { User } from '../../models/user';

import { LoginPage } from '../../pages/login/login';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

user = {} as User;

  // Our translated text strings
  private signupErrorString: string;

  constructor(private AngularFireAuth: AngularFireAuth, public navCtrl: NavController,  public toastCtrl: ToastController) {

    this.signupErrorString = 'Signup fail';
  }

  async doSignup(user: User) {
    try{
      const result = await this.AngularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      var currentUser = firebase.auth().currentUser;
      currentUser.sendEmailVerification().then(function() {
        console.log('Mail enviado')
      }).catch(function(error) {
        console.log('Mail error')
      });
      console.log(result);
      this.navCtrl.push(LoginPage);
    }
    catch(error){
      console.log(error);
    }
  }
}
