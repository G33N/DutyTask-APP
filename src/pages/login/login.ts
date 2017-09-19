import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

user = {email: 'mceliz@enlaceit.com.ar', password:'Seighei7'} as User;

  // Our translated text strings
  private loginErrorString: string;

  constructor(private AngularFireAuth: AngularFireAuth, public navCtrl: NavController, public toastCtrl: ToastController) {

      this.loginErrorString = 'Login fail';
  }

  // Attempt to login in through our User service
  async doLogin(user: User) {
    try {
      const result = await this.AngularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
          this.navCtrl.setRoot(HomePage);
      }
    }
    catch(error){
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
}
