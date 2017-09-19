import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { User } from '../../models/user';

import { HomePage } from '../../pages/home/home';
import { UserProvider } from '../../providers/user/user';
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

  constructor(private AngularFireAuth: AngularFireAuth, public navCtrl: NavController, public UserProvider: UserProvider, public toastCtrl: ToastController) {

    this.signupErrorString = 'Signup fail';
  }

  async doSignup(user: User) {
    try{
      const result = await this.AngularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      console.log(result);
    }
    catch(error){
      console.log(error);
    }
  }
}
