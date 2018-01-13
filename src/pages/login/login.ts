import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
declare var IN;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doAuth() {
    if(IN.User.isAuthorized()){
    console.log("hebe");
    this.onLinkedInLoad();

  }
    else console.log("gübe");
    //this.auth.login();
  }

   onLinkedInLoad() {
     console.log('onLinkedInLoad');
    IN.Event.on(IN, "auth", this.getProfileData());
    console.log('onLinkedInLoad1');
}

doLogout(){
  IN.User.logout(() => console.log('asd'), () => console.log('qwe'));
}

doLogin() {
IN.User.authorize(() => console.log('asd1'), () => console.log('qwe1'));
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
    IN.API.Raw("/people/~").result((data) =>console.log(data))
.error((error) =>console.log(error));
console.log('getProfileData1');

}

}
