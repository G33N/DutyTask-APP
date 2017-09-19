import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemModifyPage } from '../pages/item-modify/item-modify';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TaskProvider } from '../providers/task';
import { Api } from '../providers/api';
import { HttpModule } from '@angular/http';
import { CategoryProvider } from '../providers/category/category';
import { UserProvider } from '../providers/user/user';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemDetailPage,
    ItemCreatePage,
    ItemModifyPage,
    LoginPage,
    SignupPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemDetailPage,
    ItemCreatePage,
    ItemModifyPage,
    LoginPage,
    SignupPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TaskProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoryProvider,
    UserProvider,
    Api
  ]
})
export class AppModule { }
