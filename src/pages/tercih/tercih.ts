import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public personSer: PersonProvider) {
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
  }

  removeUzm(value: string) {
    // console.log(value);
    this.person.uzmanlik = this.person.uzmanlik.filter(item => item.id !== value);
  }

  // addTag() {
  //   console.log(this.tagid);
  //   if(this.person.tags.length<8) this.person.tags.push({"id": this.tagid, "yil":0});
  //   console.log(this.person.tags);
  // }

  setTag(value: string) {
    console.log(value);
    console.log(this.tagid);
    if(this.person.tags.length<8) this.person.tags.push({"id": value, "yil":1});
    console.log(this.person.tags);
    this.tagid = '';
    this.allTags = [];
  }


  removeTag(value) {
    this.person.tags = this.person.tags.filter(item => item.id !== value);
  }

  save() {
    // console.log(JSON.stringify(this.personSer.person)+"save()");
    this.person.like = [];
    this.person.dislike = [];
    this.personSer.updateTercih(this.person)
    .then((res) => {
      this.personSer.person = res;
      console.log(JSON.stringify(res)+" yeniperson");
      this.navCtrl.pop();
          }, (err) => {

          });
  }

  onSearchInput(value: string){
    this.tagid = value;
    // console.log(value);
     // this.searching = true;
 }

  goLinked() {
  console.log(this.cat.findIndex(obj => obj.id==this.catid));
  console.log(this.person);
  console.log(this.subcatList.length);
  console.log(this.subcatList);
  console.log(this.subcatid);
  }

}
