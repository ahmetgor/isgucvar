import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';

@Component({
  selector: 'page-eslesme',
  templateUrl: 'eslesme.html'
})
export class EslesmePage {

  person: any;
  eslesmeList:any = [];

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

}
