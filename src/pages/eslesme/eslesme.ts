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
  removed: boolean = false;
  constructor(public navCtrl: NavController, public personSer: PersonProvider) {

  }

  ionViewDidEnter() {
      console.log('ionViewDidLoad EslesmePage');
      this.person = this.personSer.person;
      this.personSer.getEslesme(this.person.like, this.person.id)
      .then((res) => {
        // this.searching = false;
        this.eslesmeList = res;
        console.log(res);
      });
    }

    // ionViewWillLeave() {
    // }

    remove(value: string) {
      this.removed = true;
      this.person.like = this.person.like.filter(item => item !== value);
      this.eslesmeList = this.eslesmeList.filter(item => item.id !== value);
      this.personSer.updateTercih(this.person)
      .then((res) => {
        console.log(JSON.stringify(res)+" yeniperson");
            }, (err) => {
            });
    }

    chat(id: string, formattedName: string) {
      this.person.deneme = "deneme";
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
