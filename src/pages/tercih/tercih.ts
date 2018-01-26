import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person';

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

person: any;
catid: string = "";
subcatid: string;
// index: number = -1;
subcatList: Array<string> = [];

  constructor(public navCtrl: NavController, public personSer: PersonProvider) {
    this.person = this.personSer.person;
    console.log(this.cat);
  }

  getSubcat() {
    this.subcatList = this.cat[this.cat.findIndex(obj => obj.id==this.catid)].subcat;
    this.subcatid = this.subcatList[0];
  }

  addTag() {
    if(this.person.uzmanlik.length<3) this.person.uzmanlik.push({"id": this.subcatid, "yil":0});
  }

  removeTag(value: string) {
    console.log(value);
    this.person.uzmanlik = this.person.uzmanlik.filter(item => item.id !== value);
  }

  save() {
    
  }

  goLinked() {
  console.log(this.cat.findIndex(obj => obj.id==this.catid));
  console.log(this.person);
  console.log(this.subcatList.length);
  console.log(this.subcatList);
  console.log(this.subcatid);
  }


}
