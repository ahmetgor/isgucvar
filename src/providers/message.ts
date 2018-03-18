import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {ToastController} from 'ionic-angular';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);

@Injectable()
export class MessageProvider {
  data: any;
    db: any;
    username: any;
    password: any;
    remote: any;

    constructor(public zone: NgZone, public toastCtrl: ToastController) {

      this.db = new PouchDB('isguc');
      this.username = 'dectsketherytowesseardea';
      this.password = '1ebb02b0844d19e1df0e4499c3feaff5094810f3';
      this.remote = 'https://dee56667-4023-4c40-a4ff-3a391e5c8035-bluemix.cloudant.com/isguc';

      let options = {
        live: true,
        retry: true,
        continuous: true,
        auth: {
          username: this.username,
          password: this.password
        }
      };

      this.db.sync(this.remote, options);
    }

    addDocument(doc){
      this.db.put(doc)
      .then((res) => {
        this.presentToast('Mesaj iletildi!');
      });
    }

    delDocument(doc){
      this.db.get(doc._id)
      .then((doc) => {
        this.presentToast('Mesaj silindi!');
        return this.db.remove(doc);
      });
    }

    getDocuments(from: string, to:string){
      console.log(from+"   "+to);
      return new Promise(resolve => {
        this.db.createIndex({
          index: {fields: ['tarih']}
      })
      .then((res) => {
        return this.db.find({
        selector: {
          from: from,
          to: to,
          tarih: {$gt: 0}
        },
         sort: [{"tarih": "desc"}]
         // ,include_docs: true
      }).then((result) => {

          this.data = [];
          console.log(JSON.stringify(result));
          // let docs = result.docs.map((row) => {
          //   this.data.push(row.doc);
          //   console.log(JSON.stringify(this.data)+"cloudant");
          //   resolve(this.data);
          // });

          this.data = result.docs;
          resolve(this.data);

          this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
            this.handleChange(change);
          });

        }).catch((error) => {

          console.log(error);

        });
      });
      });
    }

    handleChange(change){

      this.zone.run(() => {

        let changedDoc = null;
        let changedIndex = null;

        this.data.forEach((doc, index) => {

          if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
          }
        });

        //A document was deleted
        if(change.deleted){
          this.data.splice(changedIndex, 1);
        }
        else {

          //A document was updated
          if(changedDoc){
            this.data[changedIndex] = change.doc;
          }
          //A document was added
          else {
            this.data.unshift(change.doc);
          }
        }
      });
    }

    presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });
    toast.present();
  }
  }
