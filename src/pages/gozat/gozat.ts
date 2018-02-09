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
  slice: number = 0;
  scrollEnable: boolean = true;
  isEmpty: boolean;

  constructor(public navCtrl: NavController, public personSer: PersonProvider) {
    // this.gozatList.push(this.personSer.person);
    console.log(JSON.stringify(this.gozatList));
  }

  ionViewDidEnter() {
    this.isEmpty = false;
    this.scrollEnable = true;
    this.slice = 0;
    console.log('ionViewDidLoad GozatPage1');
    this.person = this.personSer.person;
    this.personSer.getPersons(this.person, this.slice)
    .then((res) => {
      // this.searching = false;
      this.gozatList = res;
      console.log(res);
      if (Object.keys(this.gozatList).length == 0) this.isEmpty = true;
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
    this.gozatList = this.gozatList.filter(item => item.id !== value);
  }

  dislike(value: string) {
    this.person.dislike.push(value);
    this.gozatList = this.gozatList.filter(item => item.id !== value);
  }

  doInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    this.slice = this.slice+2;
    this.personSer.getPersons(this.person, this.slice)
    .then((res) => {
      if (Object.keys(res).length == 0) this.scrollEnable = false;
      // this.searching = false;
      // console.log(Object.keys(res).length == 0);
      console.log(JSON.stringify(res));

      for( var key in res ) {
    this.gozatList.push(res[key]);
    console.log('Async operation has ended');

  }
      console.log(res);
    });
    infiniteScroll.complete();
  }, 500);
}

  goLinked(link: string) {
    console.log(link);
    var myWindow = window.open(link, '_system');
    // window.location.href = "mailto:destek.isgucvarisveren@isgucvar.com";
    // myWindow.close();
  }
}
