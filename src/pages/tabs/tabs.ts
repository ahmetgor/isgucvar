import { Component } from '@angular/core';

import { GozatPage } from '../about/about';
import { EslesmePage } from '../contact/contact';
import { TercihPage } from '../home/home';

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
