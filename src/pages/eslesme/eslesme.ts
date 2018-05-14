import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';
import { MesajPage } from '../mesaj/mesaj';

@Component({
  selector: 'page-eslesme',
  templateUrl: 'eslesme.html'
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

    remove(value: string) {
      // this.removed = true;
      this.person.like = this.person.like.filter(item => item !== value);
      this.eslesmeList = this.eslesmeList.filter(item => item.id !== value);
      this.person.eslesme = this.person.eslesme.filter(item => item.id !== value);
      this.eslesmeDel.push(value);
      if(this.eslesmeList.length == 0) this.isEmpty = true;
      this.personSer.updateTercih(this.person, {}, {}, this.eslesmeDel, {})
      .then((res) => {
        console.log(JSON.stringify(res)+" yeniperson");
        this.eslesmeDel = [];
            }, (err) => {
            });
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
