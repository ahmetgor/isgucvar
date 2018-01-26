import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';

@Component({
  selector: 'page-gozat',
  templateUrl: 'gozat.html'
})
export class GozatPage {

//   gozat: any = {"emailAddress":"ahmetgor@gmail.com","formattedName":"Ahmet Gör","id":"9KTeM0YOyX","industry":"Information Technology and Services","location":{"country":{"code":"tr"},"name":"Istanbul, Turkey"},"pictureUrls":{"_total":1,"values":["https://media.licdn.com/mpr/mprx/0_1xnHw88mMUwZY6EDt_wfDopmeIcYYoX31mwfxYymekQgf6b3nDwaEDTDdXQgfQEmcnwmRrhDs-F4yRomcqFbyU8mD-FZyRnmiqFod8yaZHnlyuFFiKcIfEwBan"]},"positions":{"_total":1,"values":[{"company":{"id":531760,"industry":"Telekomünikasyon","name":"i2i Systems","size":"201-500","type":"Privately Held"},"id":795800566,"isCurrent":true,"location":{"country":{"code":"tr","name":"Turkey"},"name":"Istanbul, Turkey"},"startDate":{"month":4,"year":2016},"summary":"• Analysing the technical feasibility of new mobile campaigns requested by the business divisions.\n• Configuring services, free units, promotions and tariffs to realize mobile campaigns and organize tasks before launch.\n","title":"Analyst Developer"}]},"siteStandardProfileRequest":{"url":"https://www.linkedin.com/profile/view?id=AAoAAAR7qmABcr4o7g2UPwH29co8xmQ31ODGy6E&authType=name&authToken=nx9B&trk=api*a5301396*s5591296*"},"summary":"Experienced Analyst with a demonstrated history of working in the telecommunications industry. Strong engineering professional skilled in Oracle Database and PL/SQL"}
// ;

  gozatList: Array<any> = [];
  constructor(public navCtrl: NavController, public personSer: PersonProvider) {
    this.gozatList.push(this.personSer.person);
console.log(JSON.stringify(this.gozatList));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GozatPage1');
    this.personSer.getPersons();
  }

  goLinked(link: string) {
    console.log(link);
    var myWindow = window.open(link, '_system');
    // window.location.href = "mailto:destek.isgucvarisveren@isgucvar.com";
    // myWindow.close();
  }

}
