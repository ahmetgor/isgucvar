import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';
import { TercihPage } from '../tercih/tercih';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  person: any;


  constructor(public navCtrl: NavController, public personSer: PersonProvider) {

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ProfilePage');
    this.person = this.personSer.person;
  }

  goTercih() {
    // console.log(JSON.stringify(this.person)+"gotercih");
    console.log(JSON.stringify(this.personSer.person)+"gotercihperson")
    this.navCtrl.push(TercihPage, {
    })
  }

  goLink(link: string) {
    console.log(link);
    if(link && link.trim() != "")
    var myWindow = window.open(link, '_system');
    // window.location.href = "mailto:destek.isgucvarisveren@isgucvar.com";
    // myWindow.close();
  }

  // goLinked(link: string) {
  //   console.log(link);
  //   var myWindow = window.open(link, '_system');
  //   // window.location.href = "mailto:destek.isgucvarisveren@isgucvar.com";
  //   // myWindow.close();
  // }

  goSettings() {
    this.navCtrl.push(SettingsPage, {
    })
  }
}
