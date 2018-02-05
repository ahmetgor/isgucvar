import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  person: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public personSer: PersonProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad GozatPage1');
    this.person = this.personSer.person;
  }

}
