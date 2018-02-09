import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';
import { LoginPage } from '../login/login';

 declare var IN;

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  person: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public personSer: PersonProvider,
              public app: App) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad GozatPage1');
    this.person = this.personSer.person;
  }

  mailTo() {
    var myWindow = window.open('mailto:destek@isgucvar.com', '_system');
    // window.location.href = "mailto:destek.isgucvarisveren@isgucvar.com";
    myWindow.close();
  }

  doLogout(){
    IN.User.logout(() => {  console.log('logged out');
    this.app.getRootNav().setRoot(LoginPage);
    this.person = {};
    this.personSer.person = {};
  });
  }

}
