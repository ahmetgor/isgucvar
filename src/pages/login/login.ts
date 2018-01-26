import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { PersonProvider } from '../../providers/person';
import { TabsPage } from '../tabs/tabs';
import { GozatPage } from '../gozat/gozat';

declare var IN;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,
              public personSer: PersonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.doLogin();
  }

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

doLogout(){
  IN.User.logout(() => console.log('asd'));
}

doLogin() {
IN.User.authorize(
  () => {console.log('asd1');
          this.getProfileData();
        }
  , () => console.log('qwe1'));
}


// Handle the successful return from the API call
// function onSuccess(data) {
//     console.log(data);
// }
//
// // Handle an error response from the API call
// function onError(error) {
//     console.log(error);
// }

// Use the API call wrapper to request the member's basic profile data
 getProfileData() {
   console.log('getProfileData');
    IN.API.Raw("/people/~:(id,formatted-name,location,industry,summary,specialties"+
      ",positions,picture-urls::(original),site-standard-profile-request,email-address)")
    .result((data) =>{
      // console.log(JSON.stringify(data));

      this.personSer.updatePerson(data)
      .then((res) => {
        console.log(res);
        this.navCtrl.push(TabsPage, {
        });
            }, (err) => {

            });

    })
.error((error) =>console.log(error));
console.log('getProfileData1');

}
}
