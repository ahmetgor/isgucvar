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
import { MesajPage } from '../pages/mesaj/mesaj';
import { PopoverPage } from '../pages/popover/popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth';
import { PersonProvider } from '../providers/person';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { LinkedIn  } from '@ionic-native/linkedin';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { MessageProvider } from '../providers/message';

class InAppBrowserMock extends InAppBrowser {
  open() {
  }
  on() {
  }
}

@NgModule({
  declarations: [
    MyApp,
    GozatPage,
    EslesmePage,
    TercihPage,
    TabsPage,
    LoginPage,
    SettingsPage,
    ProfilePage,
    MesajPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
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
    ProfilePage,
    MesajPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    PersonProvider,
    InAppBrowser,
    MessageProvider
    // LinkedIn
  ]
})
export class AppModule {}
