import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../pages/login/login';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {

  loading: any;
  // url: string = 'http://127.0.0.1:8080/api/auth/';
  url : string = 'https://isgucvarserver.herokuapp.com/api/auth/'
  accessToken: string;
  // redirectURI: any = "http://127.0.0.1:8080/api/auth/callback";
  redirectURI: any = "https://isgucvarserver.herokuapp.com/api/auth/callback";
  linkedUrl: string = "https://api.linkedin.com/v1/people/~:(id,formatted-name,location,industry,summary,specialties"+
    ",positions,picture-urls::(original),site-standard-profile-request,email-address)?format=json";

  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public storage: Storage,
              private iab: InAppBrowser) {
    console.log('Hello AuthProvider Provider');

  }

  getLinkedPerson() {
    return new Promise((resolve, reject) => {
      this.showLoader("Bilgileriniz alınıyor");
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', this.accessToken);
        // let uri = encodeURI('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile');
        this.http.get(this.url+"linkedPerson"+`?token=${this.accessToken}`, {headers: headers})
          .subscribe(res => {
            // let data = JSON.parse(JSON.stringify(res));
            console.log(JSON.stringify(res)+'getLinkedPerson');
            this.loading.dismiss();
            resolve(res);
            // resolve(res.json());
          }, (err) => {
            this.loading.dismiss();
            console.log(JSON.stringify(err)+"err");
            reject(err);
          });
    });
  }

  doAuth(token: string, token2: string) {
    return new Promise((resolve, reject) => {
      this.showLoader("Giriş yapılıyor");
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        // let uri = encodeURI('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile');
        // this.http.get(url+`&app=${"app"}`, {headers: headers})
        this.http.get(this.url+ 'login' + `?code=${token}&state=${token2}`, {headers: headers})
          .subscribe(res => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(JSON.stringify(data)+'data');
            this.loading.dismiss();
            this.accessToken = data.access_token;
            this.storage.set("accessToken", this.accessToken);
            resolve(data);
            // resolve(res.json());
          }, (err) => {
            this.loading.dismiss();
            reject(err);
          });
    });
  }

  public linkedLogin() {
    return new Promise((resolve, reject) => {
      console.log("linkedlogin servis");
  let browser = this.iab.create("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + "86p3aqpfdryb6f" + "&redirect_uri=" + this.redirectURI+ "&state=252890252890&scope=r_basicprofile,r_emailaddress", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
  let listener = browser.on('loadstart').subscribe((event: any) => {
    // listener.unsubscribe();
    // browser.close();

        console.log(event.url);
        console.log(JSON.stringify(event)+'url');
        //Ignore the dropbox authorize screen
        if(event.url.indexOf('www.linkedin.com') > -1){
        console.log("ignore screen");
        return;
        }

        //Check the redirect uri
        if(event.url.indexOf('callback?code') > -1 ){
        console.log("check redirect");
        let token = event.url.split('=')[1].split('&')[0];
        let token2 = event.url.split('=')[2].split('&')[0];
        console.log(token);
        console.log(token2);
          listener.unsubscribe();
          browser.close();
          this.doAuth(token, token2)
          .then((res) => {
            console.log(res);
            resolve(res);
          }, (err) => {
            reject("Could not authenticat,");
          });
        }
        else {
          reject("Could not authenticate");
        }
      });
  });

  }

// login1() {
//   let scopes = ['r_basicprofile', 'r_emailaddress'];
// this.linked.login(scopes as LinkedInLoginScopes[], true)
//   .then(() => console.log('Logged in!'));
//   // .catch(e => console.log('Error logging in', e));
// }

  showLoader(content: string){

      this.loading = this.loadingCtrl.create({
          content: content
      });
      this.loading.present();
  }

}
