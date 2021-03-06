import { Component } from '@angular/core';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { NavController, PopoverController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';
import { PopoverPage } from '../popover/popover';

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
  yeniEslesme:any = [];
  yeniLikedBy:any = [];
  // flyInOutState: String = 'in';

  constructor(public navCtrl: NavController, public personSer: PersonProvider, public popoverCtrl: PopoverController) {
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
      console.log("res");

      this.slice = this.slice+2;
      // this.searching = false;
      console.log(JSON.stringify(res));

      this.gozatList = res;

      if (this.gozatList.length == 0) this.isEmpty = true;
    });
  }

  ionViewWillLeave() {
    this.personSer.updateTercih(this.person, this.yeniLikedBy, this.yeniEslesme, {}, {})
    .then((res) => {
      this.person = res;
      this.yeniLikedBy = [];
      this.yeniEslesme = [];
          }, (err) => {
          });
  }

  like(gozatItem: any) {
    gozatItem.state = 'out';

  setTimeout(() => {
    console.log(gozatItem.id);
    console.log(this.person.likedBy);
  this.person.like.push(gozatItem.id);
  this.yeniLikedBy.push(gozatItem.id);
  this.gozatList = this.gozatList.filter(item => item.id !== gozatItem.id);

  if(this.person.likedBy && this.person.likedBy.findIndex((likedByItem) => likedByItem === gozatItem.id ) > -1) {
    this.person.eslesme = this.person.eslesme? this.person.eslesme : [];
      this.person.eslesme.push({id: gozatItem.id, tarih: Date.now()});
      this.yeniEslesme.push(gozatItem.id);
      this.personSer.updateTercih(this.person, this.yeniLikedBy, this.yeniEslesme, {}, {})
      .then((res) => {
        this.person = res;
        this.yeniLikedBy = [];
        this.yeniEslesme = [];
      }, (err) => {
            });
      let popover = this.popoverCtrl.create(PopoverPage,{
        person: this.person.pictureUrl,
        gozat: gozatItem.pictureUrl,
        personAd: this.person.formattedName,
        gozatAd: gozatItem.formattedName
      });
      popover.present();
  }
  // console.log(this.gozatList);
if (this.gozatList.length == 0) {
  this.personSer.updateTercih(this.person, this.yeniLikedBy, this.yeniEslesme, {}, {})
  .then((res) => {
    this.person = res;
    this.yeniLikedBy = [];
    this.yeniEslesme = [];
        }, (err) => {
        });

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
      this.personSer.updateTercih(this.person, this.yeniLikedBy, this.yeniEslesme, {}, {})
      .then((res) => {
        this.person = res;
        this.yeniLikedBy = [];
        this.yeniEslesme = [];
            }, (err) => {
            });

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
    this.personSer.updateTercih(this.person, this.yeniLikedBy, this.yeniEslesme, {}, {})
    .then((res) => {
      this.person = res;
      this.yeniLikedBy = [];
      this.yeniEslesme = [];
          }, (err) => {
          });

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
