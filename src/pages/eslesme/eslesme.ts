import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';
import { MesajPage } from '../mesaj/mesaj';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'page-eslesme',
  templateUrl: 'eslesme.html',
  animations: [

  trigger('flyInOut', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state('out1', style({
      transform: 'translate3d(-150%, 0, 0)'
    })),
    transition('* => out1', animate('300ms ease-out')),
    transition('* => in', animate('200ms ease-out'))
  ])
]
})
export class EslesmePage {

  person: any;
  eslesmeList:any = [];
  // removed: boolean = false;
  isEmpty: boolean;
  eslesmeDel:any = [];
  constructor(public navCtrl: NavController, public personSer: PersonProvider) {

  }

  ionViewDidEnter() {
    this.isEmpty = false;
      console.log('ionViewDidLoad EslesmePage');
      this.person = this.personSer.person;
      this.personSer.getEslesme(this.person)
      .then((res) => {
        // this.searching = false;
        this.eslesmeList = res;
        if(this.eslesmeList.length == 0) this.isEmpty = true;
        console.log(res);
      });
    }

    // ionViewWillLeave() {
    // }

    remove(value: any) {
      // this.removed = true;
      value.state = 'out1';

      setTimeout(() => {

      this.person.like = this.person.like.filter(item => item !== value.id);
      this.eslesmeList = this.eslesmeList.filter(item => item.id !== value.id);
      this.person.eslesme = this.person.eslesme.filter(item => item.id !== value.id);
      this.eslesmeDel.push(value.id);
      if(this.eslesmeList.length == 0) this.isEmpty = true;
      this.personSer.updateTercih(this.person, {}, {}, this.eslesmeDel, {})
      .then((res) => {
        console.log(JSON.stringify(res)+" yeniperson");
        this.eslesmeDel = [];
            }, (err) => {
            });

            value.state = 'in';
          }, 400);
    }

    chat(id: string, formattedName: string) {
      // this.person.deneme = "deneme";
      this.navCtrl.push(MesajPage, {id: id, formattedName: formattedName});
    }

    goLink(link: string) {
      console.log(link);
      if(link && link.trim() != "")
      var myWindow = window.open(link, '_system');
      // window.location.href = "mailto:destek.isgucvarisveren@isgucvar.com";
      // myWindow.close();
    }

}
