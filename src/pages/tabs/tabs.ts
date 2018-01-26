import { Component } from '@angular/core';

import { GozatPage } from '../gozat/gozat';
import { EslesmePage } from '../eslesme/eslesme';
import { TercihPage } from '../tercih/tercih';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TercihPage;
  tab2Root = GozatPage;
  tab3Root = EslesmePage;

  constructor() {

  }
}
