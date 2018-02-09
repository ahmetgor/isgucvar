import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesajPage } from './mesaj';

@NgModule({
  declarations: [
    MesajPage,
  ],
  imports: [
    IonicPageModule.forChild(MesajPage),
  ],
})
export class MesajPageModule {}
