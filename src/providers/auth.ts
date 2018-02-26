import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../pages/login/login';
import {LoadingController} from 'ionic-angular';
// import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {

  loading: any;
  url: string = 'http://127.0.0.1:8080/api/auth/';
  // url : string = 'https://isgucvarserver.herokuapp.com/api/auth/'
  accessToken: string = 'AQVWMxkd3kzYLGwIOGaeaPCXig9hdCF2JFxNAJfoYaXEECmI1iIRsltRveUoR7-qk-nxnuRDqjdPEEmApDDzMsvylSCmFl9-30lwAvJeGT6DvH40OIGg-TpL-if9d_ANwSjqM7wuJR7JcgYQ8ELjd832UWimD_iWCTVRVnASP2YFE4YCrAp5vgtzQHHAkK5G8TLsJnasZG9YwrNXFVk-Xrz4T6I6nOtVXaQ6X_lis5_ejTyusFi5tD_Q3vlRIAZmo5xN_Soo_s2goavnXDZwYlczU7o5d1BsHyuxowuAyL2kg3Gi9Hhqa4nmc_4BKyojTbAvskmjfXiby2HSaGVA-ks4fi9wlw';
  linkedUrl: string = "https://api.linkedin.com/v1/people/~:(id,formatted-name,location,industry,summary,specialties"+
    ",positions,picture-urls::(original),site-standard-profile-request,email-address)?format=json";

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello AuthProvider Provider');
  }

  getLinkedPerson() {
    return new Promise((resolve, reject) => {
      // this.showLoader();
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', this.accessToken);
        // let uri = encodeURI('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile');
        this.http.get(this.url+"linkedPerson"+`?token=${this.accessToken}`, {headers: headers})
          .subscribe(res => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(JSON.stringify(data)+'data');
            // this.loading.dismiss();
            resolve(data);
            // resolve(res.json());
          }, (err) => {
            // this.loading.dismiss();
            console.log(JSON.stringify(err)+"err");
            reject(err);
          });
    });
  }

  doAuth(url: string) {
    return new Promise((resolve, reject) => {
      // this.showLoader();
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        // let uri = encodeURI('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile');
        this.http.get(url, {headers: headers})
          .subscribe(res => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(JSON.stringify(data)+'data');
            // this.loading.dismiss();
            resolve(data);
            // resolve(res.json());
          }, (err) => {
            // this.loading.dismiss();
            reject(err);
          });
    });
  }

login(){

return new Promise((resolve, reject) => {
  // this.showLoader();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // let uri = encodeURI('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile');
    this.http.get(this.url,
      {headers: headers})
      .subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(JSON.stringify(data)+'user');
        // this.loading.dismiss();
        resolve(data);
        // resolve(res.json());
      }, (err) => {
        // this.loading.dismiss();
        reject(err);
      });
});
}

// login1() {
//   let scopes = ['r_basicprofile', 'r_emailaddress'];
// this.linked.login(scopes as LinkedInLoginScopes[], true)
//   .then(() => console.log('Logged in!'));
//   // .catch(e => console.log('Error logging in', e));
// }

  showLoader(){

      this.loading = this.loadingCtrl.create({
          content: 'İşlem yapılıyor...'
      });
      this.loading.present();
  }

}
