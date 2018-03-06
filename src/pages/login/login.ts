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
    // this.doLogin();
    // this.getProfileData();
    this.storage.get('accessToken').then((val) => {
      console.log(val+"val");
      if(val) {
        this.authSer.accessToken = val;
        this.getLinkedPerson();
  }
});
  }

  getLinkedPerson() {
    this.authSer.getLinkedPerson()
    .then((res) => {
      console.log(JSON.stringify(res)+"getlinkedperson");
      this.personSer.updatePerson(res)
      .then((res) => {
        console.log(JSON.stringify(res)+"updateperson");
        this.navCtrl.push(TabsPage, {
        });
            }, (err) => {
              console.log("updateperson err")

            });

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

        this.authSer.linkedLogin().then((success) => {
        console.log(JSON.stringify(success)+"success");
        this.getLinkedPerson();
        }, (error) => {
          console.log(error+"error");
        });

  // this.authSer.login()
  // .then((res) => {
  //   console.log(res);
  //       }, (err) => {
  // });

  // this.authSer.login1();

// IN.User.authorize(
//   () => {console.log('asd1');
//           this.getProfileData();
//         }
//   , () => console.log('qwe1'));

// doAuth() {
//   if(IN.User.isAuthorized()){
// }
//   else console.log("gübe");
//   this.onLinkedInLoad();
// }

//    onLinkedInLoad() {
//      console.log('onLinkedInLoad');
//     IN.Event.on(IN, "auth", this.getProfileData());
//     console.log('onLinkedInLoad1');
// }

// Handle the successful return from the API call
// function onSuccess(data) {
//     console.log(data);
// }
// // Handle an error response from the API call
// function onError(error) {
//     console.log(error);
// }
}

}
