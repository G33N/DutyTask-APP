import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Firebase
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//Pages
import { HomePage } from '../home/home';
//Models
import { Profile } from '../../models/profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile = {} as Profile;

  constructor(private AngularFireAuth: AngularFireAuth, private database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

  }

  createProfile() {
    this.AngularFireAuth.authState.subscribe(auth => {
      this.updateProfile();
      this.database.object(`profile/${auth.uid}`).set(this.profile).then(() =>
      this.navCtrl.push(HomePage));
    });
  }
  updateProfile() {
    var user = firebase.auth().currentUser;
    // Updates the user attributes:
    user.updateProfile({
      displayName: this.profile.firstName+' '+this.profile.lastName,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Profile updated successfully!
      // "Jane Q. User"
      var displayName = user.displayName;
      // "https://example.com/jane-q-user/profile.jpg"
      var photoURL = user.photoURL;
      console.log(displayName + photoURL);
    }, function(error) {
      // An error happened.
    });
  }

  ionViewDidLoad() {
  }

}
