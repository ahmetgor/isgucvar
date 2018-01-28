import { Component } from '@angular/core';

import { GozatPage } from '../gozat/gozat';
import { EslesmePage } from '../eslesme/eslesme';
// import { TercihPage } from '../tercih/tercih';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilePage;
  tab2Root = GozatPage;
  tab3Root = EslesmePage;

  constructor() {

  }
}
