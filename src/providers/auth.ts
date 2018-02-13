import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../pages/login/login';
import {LoadingController} from 'ionic-angular';
// import { LinkedIn } from '@ionic-native/linkedin';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {

  loading: any;
  // url: string = 'http://127.0.0.1:8080/api/auth/';
  url : string = 'https://isgucvarserver.herokuapp.com/api/auth/'

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello AuthProvider Provider');
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

  showLoader(){

      this.loading = this.loadingCtrl.create({
          content: 'İşlem yapılıyor...'
      });
      this.loading.present();
  }

}
