import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class PersonProvider {

  url : string = 'http://127.0.0.1:8080/api/persons/';

  loading: any;
  person: any;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello PersonProvider Provider');
  }

  updatePerson(kayit: any){
    this.showLoader();
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.authService.token);

      this.http.put(this.url, kayit, {headers: headers})
        // .map(res => res.json())
        .subscribe(res => {
          //console.log(JSON.stringify(res)+"avatarres");
          this.person = res;
          if(!this.person.uzmanlik) this.person.uzmanlik = [];
          this.loading.dismiss();
          console.log(res);
          resolve(res);
        }, (err) => {
          //console.log(JSON.stringify(err)+"avatarerr");
          this.loading.dismiss();
          // this.presentToast('Özgeçmiş güncellenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  showLoader(){

      this.loading = this.loadingCtrl.create({
          content: 'İşlem yapılıyor...'
      });
      this.loading.present();
  }

    getPersons(){

      // return new Promise((resolve, reject) => {
      //   this.showLoader();
      //     let headers = new HttpHeaders();
      //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
      //     headers.set('Access-Control-Allow-Origin', '*');
      //     console.log(JSON.stringify(headers));
      //     let uri = encodeURI('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile');
      //
      //     console.log(uri);
      //     this.http.get(uri, {headers: headers})
      //       .subscribe(res => {
      //
      //         let data = JSON.parse(JSON.stringify(res));
      //         console.log(JSON.stringify(data)+'user');
      //         // this.storage.set('token', data.token);
      //         // this.events.publish('login:event');
      //
      //         this.loading.dismiss();
      //
      //         resolve(data);
      //         // resolve(res.json());
      //       }, (err) => {
      //         this.loading.dismiss();
      //         // this.presentToast('Bilgileriniz hatalı veya hesabınız aktif değil!');
      //         //console.log(JSON.stringify(err)+'servis err');
      //         reject(err);
      //       });
      // });
    }

}
