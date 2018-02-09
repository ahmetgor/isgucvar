import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
// declare var IN;

@Component({
  selector: 'page-tercih',
  templateUrl: 'tercih.html'
})
export class TercihPage {
cat: any =  [{"id":"Software Engineering", "subcat": ["AR/VR", "Backend", "Blockchain", "Computer Vision", "Embedded", "Manager", "Frontend",
    "Full Stack", "Gaming", "Hardware", "Mobile", "NLP", "Search", "Security"]},
    {"id":"Design", "subcat": ["Brand/Graphic Designer", "Product Designer", "UX Designer", "UX Researcher", "Visual/UI Designer"]},
    {"id":"Data Analytics", "subcat": ["Business Analyst", "Business Operations", "Data Analyst", "Data Scientist", "Machine Learning"]},
    {"id":"DevOps", "subcat": ["DevOps", "Build/Release", "Site Reliability Engineer (SRE)"]},
    {"id":"Quality Assurance (QA)", "subcat": ["QA Manual Test", "QA Test Automation"]},
    {"id":"Information Technology", "subcat": ["Business Systems", "Database Administrator", "Desktop Support", "Network Administrator",
    "Network", "NOC", "SAP Developer", "Solutions Architect", "Solutions", "Systems Administrator"]},
    {"id":"Project Management", "subcat": ["IT Project Manager", "Program Manager", "Project Manager"]},
    {"id":"Product Management", "subcat": ["Product Management"]
  }];

searchControl: FormControl;
person: any;
catid: string = "";
subcatid: string;
tagid: string;
allTags: any = [];
showTagEkle: boolean = false;
// index: number = -1;
// searching: any = false;
subcatList: Array<string> = [];
sehirler: Array<string> = [];

  constructor(public navCtrl: NavController, public personSer: PersonProvider, public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
    // this.person = this.personSer.person;
    this.searchControl = new FormControl();
    this.person = JSON.parse(JSON.stringify(this.personSer.person));
    this.sehirler = this.personSer.sehirler;
    // console.log(this.personSer.sehirler);
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(300).subscribe(search => {

      if(search.length == 0) this.allTags = [];
      else {
      console.log(search+"search");
      this.personSer.getTags(this.tagid)
      .then((res) => {
        // this.searching = false;
        this.allTags = res;
        console.log(res);
      });
    }
    });
  }

  getSubcat() {
    this.subcatList = this.cat[this.cat.findIndex(obj => obj.id==this.catid)].subcat;
    this.subcatid = this.subcatList[0];
  }

  addUzm() {
    if(this.person.uzmanlik.length<3) this.person.uzmanlik.push({"id": this.subcatid, "yil":1});
    else this.presentToast("En fazla 3 adet seçilebilir.");
  }

  removeUzm(value: string) {
    if(this.person.uzmanlik.length>1)
    this.person.uzmanlik = this.person.uzmanlik.filter(item => item.id !== value);
    else this.presentToast("En az 1 adet olmalıdır.");
  }

  setTag(value: string) {
    console.log(value);
    console.log(this.tagid);
    if(this.person.tags.length<6)
    this.person.tags.push({"id": value, "yil":1});
    else this.presentToast("En fazla 6 adet seçilebilir.");
    console.log(this.person.tags);
    this.tagid = '';
    this.allTags = [];
  }


  removeTag(value) {
    if(this.person.tags.length>1)
    this.person.tags = this.person.tags.filter(item => item.id !== value);
    else this.presentToast("En az 1 adet olmalıdır.");
  }

  save() {
    // console.log(JSON.stringify(this.personSer.person)+"save()");
    this.person.like = [];
    this.person.dislike = [];
    if (this.person.uzmanlik.length==0 || this.person.tags.length==0)
    this.presentToast("Lütfen en az 1 adet uzmanlık ve bilgi seçin.");
    else {
    this.personSer.updateTercih(this.person)
    .then((res) => {
      this.personSer.person = res;
      console.log(JSON.stringify(res)+" yeniperson");
      this.navCtrl.pop();
          }, (err) => {

          });
        }
  }

  onSearchInput(value: string){
    this.tagid = value;
    // console.log(value);
     // this.searching = true;
 }

 presentToast(mesaj) {
 let toast = this.toastCtrl.create({
   message: mesaj,
   duration: 4000,
   position: 'top',
   showCloseButton: true,
   closeButtonText: 'OK'
 });
 toast.present();
}

presentAlert() {
let alert = this.alertCtrl.create({
  title: 'Bilgileriniz Gizlidir!',
  subTitle: "Buradaki bilgileriniz hiçbir koşulda kimse ile paylaşılmayacak, sadece sizin tarafınızdan görüntülenecektir." +
   "\n" + "\n" +
    "İletişim bilgileri sadece eşleşme (çift taraflı onay) sonrası paylaşılacaktır.",
  buttons: ['Kapat']
});
alert.present();
}

infoPressed() {
  this.presentAlert();
}

presentSave() {
  let alert = this.alertCtrl.create({
    title: 'Kriterleriniz Değişiyor',
    message: 'Kriterleriniz değişeceğinden eşleşme ve beğeni listeleriniz sıfırlanacaktır. Devam edilsin mi?',
    buttons: [
      {
        text: 'Hayır',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      },
      {
        text: 'Evet',
        handler: () => {
          // console.log('Buy clicked');
          this.save();
        }
      }
    ]
  });
  alert.present();
}

  // goLinked() {
  // console.log(this.cat.findIndex(obj => obj.id==this.catid));
  // console.log(this.person);
  // console.log(this.subcatList.length);
  // console.log(this.subcatList);
  // console.log(this.subcatid);
  // }

}