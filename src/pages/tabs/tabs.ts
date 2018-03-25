import { Component } from '@angular/core';

import { GozatPage } from '../gozat/gozat';
import { EslesmePage } from '../eslesme/eslesme';
// import { TercihPage } from '../tercih/tercih';
import { ProfilePage } from '../profile/profile';
import { SuperTabsController } from 'ionic2-super-tabs';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilePage;
  tab2Root = GozatPage;
  tab3Root = EslesmePage;

  constructor(private superTabsCtrl: SuperTabsController) {
    this.superTabsCtrl.setBadge('eslesmeTab', 5);

  }

  ionViewDidEnter() {
    this.superTabsCtrl.setBadge('eslesmeTab', 5);
    this.superTabsCtrl.setBadge('profilimTab', 5);

  }
}
