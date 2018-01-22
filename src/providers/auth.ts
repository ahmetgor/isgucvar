import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../pages/login/login';
import {LoadingController} from 'ionic-angular';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  loading: any;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello AuthProvider Provider');
  }

  login(){

    return new Promise((resolve, reject) => {
      this.showLoader();
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.set('Access-Control-Allow-Origin', '*');
        console.log(JSON.stringify(headers));
        let uri = encodeURI('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile');

        console.log(uri);
        this.http.get(uri, {headers: headers})
          .subscribe(res => {

            let data = JSON.parse(JSON.stringify(res));
            console.log(JSON.stringify(data)+'user');
            // this.storage.set('token', data.token);
            // this.events.publish('login:event');

            this.loading.dismiss();

            resolve(data);
            // resolve(res.json());
          }, (err) => {
            this.loading.dismiss();
            // this.presentToast('Bilgileriniz hatalı veya hesabınız aktif değil!');
            //console.log(JSON.stringify(err)+'servis err');
            reject(err);
          });
    });
  }

  showLoader(){

      this.loading = this.loadingCtrl.create({
          content: 'İşlem yapılıyor...'
      });
      this.loading.present();
  }

}
