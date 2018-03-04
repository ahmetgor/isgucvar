import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../pages/login/login';
import {LoadingController, ToastController} from 'ionic-angular';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersonProvider {

  // url : string = 'http://127.0.0.1:8080/api/persons/';
  url : string = 'https://isgucvarserver.herokuapp.com/api/persons/'

  loading: any;
  person: any;
  sehirler: Array<string>;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    console.log('Hello PersonProvider Provider');
    this.getSehirler();
  }

  updatePerson(kayit: any){
    // this.showLoader();
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
          if(!this.person.tags) this.person.tags = [];
          if(!this.person.like) this.person.like = [];
          if(!this.person.dislike) this.person.dislike = [];
          // this.loading.dismiss();
          console.log(res);
          resolve(res);
        }, (err) => {
          //console.log(JSON.stringify(err)+"avatarerr");
          // this.loading.dismiss();
          // this.presentToast('Özgeçmiş güncellenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  updateTercih(kayit: any){
    // this.showLoader();
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.authService.token);
      this.http.put(this.url + 'tercih/', kayit, {headers: headers})
        .subscribe(res => {
          console.log(JSON.stringify(res)+"updateTercih");
          this.person = res;
          // this.loading.dismiss();
          console.log(res);
          resolve(res);
        }, (err) => {
          //console.log(JSON.stringify(err)+"avatarerr");
          // this.loading.dismiss();
          // this.presentToast('Özgeçmiş güncellenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  getTags(searchTerm: string, cat: string){
    let headers = new HttpHeaders();
      // headers.append('Authorization', this.authService.token);
      headers.append('Content-Type', 'application/json');
      console.log(searchTerm+"hebe");
      return new Promise((resolve, reject) => {
      this.http.get(this.url+'tags/' + `?tag=${searchTerm}&cat=${cat}`, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          // reject(err);
          // this.presentToast('İlan listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

    getPersons(person: any, slice: number){

      let headers = new HttpHeaders();
      let params = new HttpParams();
      // params.set('person', JSON.stringify(person));
      // params.append('person', JSON.stringify(person));

      // this.showLoader();
        // headers.append('Authorization', this.authService.token);
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(params));
        person.slice = slice;
        return new Promise((resolve, reject) => {
        this.http.post(this.url
          // + `?person=${JSON.stringify(person)}`
          ,person
          , {headers: headers})
          .subscribe(data => {
            // this.loading.dismiss();
            resolve(data);
          }, (err) => {
            // reject(err);
            // this.loading.dismiss();
          });
      });
    }

    getEslesme(like: Array<any>, personId: string){

      // this.showLoader();
      let headers = new HttpHeaders();
        // headers.append('Authorization', this.authService.token);
        headers.append('Content-Type', 'application/json');
        return new Promise((resolve, reject) => {
        this.http.get(this.url+'eslesme/' + `?like=${like}&id=${personId}`, {headers: headers})
          .subscribe(data => {
            // this.loading.dismiss();
            resolve(data);
          }, (err) => {
            // reject(err);
            // this.loading.dismiss();
          });
      });
    }

    sendMessage(message: any, operation: string) {
      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', this.authService.token);
        this.http.put(this.url + 'message/' + `?operation=${operation}`, message, {headers: headers})
          .subscribe(res => {
            // this.loading.dismiss();
            this.presentToast('Mesaj '+ operation + '!');

            console.log(res);
            resolve(res);
          }, (err) => {
            this.presentToast('Hata oluştu, lütfen tekrar deneyin!');
          });
      });
    }

    presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });
    toast.present();
  }

      showLoader(){
          this.loading = this.loadingCtrl.create({
              content: 'İşlem yapılıyor...'
          });
          this.loading.present();
      }

    getSehirler() {
      this.sehirler = ["Adana","Adıyaman","Afyon","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın",
"Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli",
"Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta",
"İçel (Mersin)","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya",
"Malatya","Manisa","K.maraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop",
"Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt",
"Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"
      ];
      // console.log(this.sehirler);
    }

}
