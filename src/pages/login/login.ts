import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import { AuthProvider } from '../../providers/auth';
import { PersonProvider } from '../../providers/person';
import { AuthProvider } from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
import { GozatPage } from '../gozat/gozat';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

declare var IN: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  accessToken: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public personSer: PersonProvider,
              public authSer: AuthProvider, private platform: Platform, private iab: InAppBrowser,
              public storage: Storage) {

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if(this.platform.is("android") || this.platform.is("ios")) {

    this.storage.get('accessToken').then((val) => {
      console.log(val+"val");
      if(val) {
        this.authSer.accessToken = val;
        this.getLinkedPerson();
  }
});
}
// else{
//   this.platform.ready().then(() => {
//
//   if(IN.User.isAuthorized()){
//     this.getProfileData();
// }
// });
// }
  }

  getLinkedPerson() {
    this.authSer.getLinkedPerson()
    .then((res) => {
      if(JSON.parse(JSON.stringify(res)).id) {
      console.log(JSON.stringify(res)+"getlinkedperson");
      this.personSer.updatePerson(res)
      .then((res) => {
        console.log(JSON.stringify(res)+"updateperson");
        this.navCtrl.push(TabsPage, {
        });
            }, (err) => {
              console.log("updateperson err")

            });
          }
          else this.doLogin();

          }, (err) => {
            console.log("getLinkedPerson err")
          });
  }

getProfileData() {
  console.log('getProfileData');
   IN.API.Raw("/people/~:(id,formatted-name,location,industry,summary,specialties"+
     ",positions,picture-urls::(original),picture-url,site-standard-profile-request,email-address)")
   .result((data) =>{
     console.log(JSON.stringify(data)+"öndata_getProfileData");

     this.personSer.updatePerson(data)
     .then((res) => {
       console.log(res+"getProfileData");
       this.navCtrl.push(TabsPage, {
       });
           }, (err) => {

           });
   })
.error((error) =>console.log(error+"hebe"));
console.log('getProfileData1');

}

doLogin() {

if(this.platform.is("android") || this.platform.is("ios")) {
  console.log("mobil");
this.authSer.linkedLogin().then((success) => {
console.log(JSON.stringify(success)+"success");
this.getLinkedPerson();
}, (error) => {
  console.log(error+"error");
});
}

else {
  console.log("browser");
IN.User.authorize(
  () => {console.log('asd1');
          this.getProfileData();
        }
  , () => console.log('qwe1'));

}
}

}
