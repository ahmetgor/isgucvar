import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';

@Component({
  selector: 'page-gozat',
  templateUrl: 'gozat.html'
})
export class GozatPage {

  person: any;
  gozatList:any = [];

  constructor(public navCtrl: NavController, public personSer: PersonProvider) {
    // this.gozatList.push(this.personSer.person);
    console.log(JSON.stringify(this.gozatList));
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad GozatPage1');
    this.person = this.personSer.person;
    this.personSer.getPersons(this.person)
    .then((res) => {
      // this.searching = false;
      this.gozatList = res;
      console.log(res);
    });
  }

  ionViewWillLeave() {
    this.personSer.updateTercih(this.person)
    .then((res) => {
      console.log(JSON.stringify(res)+" yeniperson");
          }, (err) => {
          });
  }

  like(value: string) {
    this.person.like.push(value);
  }

  dislike(value: string) {
    this.person.dislike.push(value);
  }

  goLinked(link: string) {
    console.log(link);
    var myWindow = window.open(link, '_system');
    // window.location.href = "mailto:destek.isgucvarisveren@isgucvar.com";
    // myWindow.close();
  }
}
