import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import { AuthProvider } from '../../providers/auth';
import { PersonProvider } from '../../providers/person';
import { AuthProvider } from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
import { GozatPage } from '../gozat/gozat';

declare var IN: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public personSer: PersonProvider,
              public authSer: AuthProvider, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.doLogin();
    // this.getProfileData();
  }

  getLinkedPerson() {
    this.authSer.getLinkedPerson()
    .then((res) => {
      console.log("getLinkedPerson cevap")
      console.log(res);

          }, (err) => {
            console.log("getLinkedPerson err")
          });
  }

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
.error((error) =>console.log(error+"hebe"));
console.log('getProfileData1');

}

public linkedLogin(): Promise<any> {
    return new Promise(function(resolve, reject) {
      var browserRef = window.cordova.InAppBrowser.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + "86p3aqpfdryb6f" + "&redirect_uri=http://localhost:8080/api/auth/callback&state=252890252890&scope=r_basicprofile", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
        // var browserRef = window.cordova.InAppBrowser.open("https://www.facebook.com/v2.0/dialog/oauth?client_id=" + "CLIENT_ID_HERE" + "&redirect_uri=http://localhost/callback&response_type=token&scope=email", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
        browserRef.addEventListener("loadstart", (event) => {
        console.log(JSON.stringify(event)+"event");
        console.log(event.url+"url");

            if ((event.url).indexOf("http://localhost:8080/api/auth/callback") === 0) {

                // browserRef.removeEventListener("exit", (event) => {});
                // browserRef.close();
                //
                // var responseParameters = ((event.url).split("#")[1]).split("&");
                // console.log(responseParameters+"response");
                //
                // var parsedResponse = {};
                // for (var i = 0; i < responseParameters.length; i++) {
                //     parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                // }
                // console.log(JSON.stringify(parsedResponse)+"parsedres");
                // if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                //     resolve(parsedResponse);
                // } else {
                //     reject("Problem authenticating with Facebook");
                // }
            }
        });
        browserRef.addEventListener("exit", function(event) {
          console.log(JSON.stringify(event)+"exitevent")
            reject("LinkedIn giriş yapılamadı, lütfen tekrar deneyin");
        });
    });
}

doLogin() {

    this.platform.ready().then(() => {
        this.linkedLogin().then(success => {
            alert(success.access_token);
        }, (error) => {
            alert(error);
        });
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
