import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Pages
import { HomePage } from '../pages/home/home';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemModifyPage } from '../pages/item-modify/item-modify';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { ProfilePage } from '../pages/profile/profile';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
// Local storage
import { IonicStorageModule } from '@ionic/storage';
//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
// Facebook
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemDetailPage,
    ItemCreatePage,
    ItemModifyPage,
    LoginPage,
    SignupPage,
    WelcomePage,
    ProfilePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Import IonicStorageModule to local storage
    IonicStorageModule.forRoot(),
    // Import AngularFireModule to use firebase API
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    // Import AngularFireAuthModule to use Authenticacion API
    AngularFireAuthModule,
    // Import AngularFireAuthModule to use database interactions
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemDetailPage,
    ItemCreatePage,
    ItemModifyPage,
    LoginPage,
    SignupPage,
    WelcomePage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook
  ]
})
export class AppModule { }
