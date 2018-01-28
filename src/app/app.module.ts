import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GozatPage } from '../pages/gozat/gozat';
import { EslesmePage } from '../pages/eslesme/eslesme';
import { TercihPage } from '../pages/tercih/tercih';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth';
import { PersonProvider } from '../providers/person';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    GozatPage,
    EslesmePage,
    TercihPage,
    TabsPage,
    LoginPage,
    SettingsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GozatPage,
    EslesmePage,
    TercihPage,
    TabsPage,
    LoginPage,
    SettingsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    PersonProvider
  ]
})
export class AppModule {}
