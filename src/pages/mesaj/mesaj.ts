import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';
import { MessageProvider } from '../../providers/message';

/**
 * Generated class for the MesajPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mesaj',
  templateUrl: 'mesaj.html',
})
export class MesajPage {

  person: any;
  to_id: string;
  to_name: string;
  mesaj: string;
  konu: string;
  cloneMessageList: any = [];
  messageListCl : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public personSer: PersonProvider,
              public messageSer: MessageProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MesajPage');
    this.to_id = this.navParams.get("id");
    this.to_name = this.navParams.get("formattedName");
    // this.cloneMessageList = JSON.parse(JSON.stringify(this.personSer.person.messages));
    this.person = this.personSer.person;
    this.cloneMessageList = this.person.messages.filter(item => item.to == this.to_id || item.from == this.to_id);
    // console.log(this.person.id+ "   "+this.to_id)
    this.messageSer.getDocuments(this.person.id, this.to_id)
    .then((res) => {
      console.log(JSON.stringify(res));
      this.messageListCl = res;
    });

    // console.log(JSON.stringify(this.person));
    // console.log(this.to_id);
  }

  send() {
    let mesajItem: any = {};
    mesajItem._id = new Date();
    mesajItem.to = this.to_id;
    mesajItem.from = this.person.id;
    mesajItem.from_name = this.person.formattedName;
    mesajItem.to_name = this.to_name;
    mesajItem.text = this.mesaj;
    mesajItem.konu = this.konu;
    mesajItem.tarih = Date.now();
    // this.person.messages.push(mesajItem);
    // this.cloneMessageList.push(mesajItem);
    // this.personSer.sendMessage(mesajItem, "gönderildi")
    // .then((res) => {
    //   this.mesaj = "";
    //   this.konu = "";
    //   console.log(res);
    // });
    this.messageSer.addDocument(mesajItem);
    mesajItem = {};
  }

  delete(slide: ItemSliding, mesaj: any) {
    console.log(JSON.stringify(mesaj));
  // this.cloneMessageList = this.cloneMessageList
  // .filter(item => item.to !== mesaj.to || item.from !== mesaj.from || item.text !== mesaj.text);
  // this.person.messages = this.person.messages
  // .filter(item => item.to !== mesaj.to || item.from !== mesaj.from || item.text !== mesaj.text);
  // this.personSer.sendMessage(mesaj, "silindi")
  // .then((res) => {
  //   console.log(res);
  // });
this.messageSer.delDocument(mesaj);
  slide.close();
}

  getColor(fromName: string) {
    if(fromName==this.person.formattedName)
    return "secondary";
    else return "primary";
  }

}
