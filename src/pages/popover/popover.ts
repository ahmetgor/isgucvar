import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  person: string;
  gozat: string;
  personAd: string;
  gozatAd: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PopoverPage');
    this.person = this.navParams.data.person;
    this.gozat = this.navParams.data.gozat;
    this.personAd = this.navParams.data.personAd;
    this.gozatAd = this.navParams.data.gozatAd;
  }

  close() {
  this.viewCtrl.dismiss();
}

}
