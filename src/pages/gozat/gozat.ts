import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';


@Component({
  selector: 'page-gozat',
  templateUrl: 'gozat.html',
  animations: [

  trigger('flyInOut', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state('out', style({
      transform: 'translate3d(150%, 0, 0)'
    })),
    state('out1', style({
      transform: 'translate3d(-150%, 0, 0)'
    })),
    transition('* => out', animate('300ms ease-in')),
    transition('* => out1', animate('300ms ease-out')),
    transition('* => in', animate('200ms ease-out'))
  ])
]
})
export class GozatPage {

  person: any;
  gozatList:any = [];
  slice: number = 0;
  scrollEnable: boolean = true;
  isEmpty: boolean;
  // flyInOutState: String = 'in';

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
      this.slice = this.slice+2;
      // this.searching = false;
      this.gozatList = res;
      console.log(res);
      if (this.gozatList.length == 0) this.isEmpty = true;
    });
  }

  ionViewWillLeave() {
    this.personSer.updateTercih(this.person)
    .then((res) => {
      // console.log(JSON.stringify(res)+" yeniperson");
          }, (err) => {
          });
  }

  like(gozatItem: any) {
    console.log("hebe");
    gozatItem.state = 'out';

  setTimeout(() => {
    console.log("heb");
  this.person.like.push(gozatItem.id);
  this.gozatList = this.gozatList.filter(item => item.id !== gozatItem.id);
  console.log(this.gozatList);
if (this.gozatList.length == 0) {
  this.slice = 0;
  this.personSer.getPersons(this.person, this.slice)
  .then((res) => {
    this.slice = this.slice+2;
    this.gozatList = res;
    if (this.gozatList.length == 0) this.isEmpty = true;

  });
}

    gozatItem.state = 'in';
  }, 400);

  }

  dislike(gozatItem: any) {
    gozatItem.state = 'out1';

  setTimeout(() => {
    console.log("heb1");
    this.person.dislike.push(gozatItem.id);
    this.gozatList = this.gozatList.filter(item => item.id !== gozatItem.id);

    if (this.gozatList.length == 0) {
      this.slice = 0;

      this.personSer.getPersons(this.person, this.slice)
      .then((res) => {
        this.slice = this.slice+2;
        this.gozatList = res;
        if (this.gozatList.length == 0) this.isEmpty = true;

      });
    }
    gozatItem.state = 'in';
  }, 400);
  }

  doInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    this.personSer.getPersons(this.person, this.slice)
    .then((res) => {
      this.slice = this.slice+2;

      if (Object.keys(res).length == 0) this.scrollEnable = false;
      // this.searching = false;
      // console.log(Object.keys(res).length == 0);
      console.log(JSON.stringify(res));

      for( var key in res ) {
    this.gozatList.push(res[key]);
    console.log('Async operation has ended');

  }
  if (this.gozatList.length == 0) this.isEmpty = true;
      // console.log(res);
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

  getColor(puan: number) {
    if (puan > 79)
    return "darkgreen";
    else if (puan> 51 && puan<80)
    return "secondary";
    else return "gold";
  }
}
