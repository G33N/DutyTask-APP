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
import { TaskProvider } from '../providers/task';
import { Api } from '../providers/api';
import { HttpModule } from '@angular/http';
import { CategoryProvider } from '../providers/category/category';
import { UserProvider } from '../providers/user/user';
// Local storage
import { IonicStorageModule } from '@ionic/storage';
//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { LoginProvider } from '../providers/login/login';
// Facebook
import { Facebook } from '@ionic-native/facebook';
import { FilterPipe } from '../pipes/filter/filter';
// Native Camera
//import { Camera } from '@ionic-native/camera';
// Translate Module
// import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//     return new TranslateHttpLoader(http);
// }

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
    FilterPipe
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
    // HttpClientModule,
    // TranslateModule.forRoot({
    //       loader: {
    //         provide: TranslateLoader,
    //         useFactory: HttpLoaderFactory,
    //         deps: [HttpClient]
    //       }
    //     }),
    // Native Camera
    // Camera,
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
    TaskProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoryProvider,
    UserProvider,
    Api,
    LoginProvider,
    Facebook
  ]
})
export class AppModule { }
