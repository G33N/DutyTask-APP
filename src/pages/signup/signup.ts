import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../../pages/home/home';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user: { firstName: string, lastName: string, user: string, email: string, password: string } = {
    firstName: '',
    lastName: '',
    user: '',
    email: '',
    password: ''
      };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public UserProvider: UserProvider,
    public toastCtrl: ToastController) {

    this.signupErrorString = 'Signup fail';
  }

  doSignup() {
    // Attempt to login in through our User service
    this.UserProvider.signup(this.user).then(data => {
      this.navCtrl.push(HomePage);
    }, (err) => {

      // this.navCtrl.push(HomePage); // TODO: Remove this when you add your signup endpoint

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
