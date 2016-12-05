import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { WorkerProvider } from '../providers/worker.provider';

declare var Notification: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{ title: string, icon: string, component: any, index?: number }>;

  constructor(public platform: Platform, public worker: WorkerProvider) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'IonicPhones', icon: 'home', component: TabsPage },
      { title: 'Cart', icon: 'cart', component: TabsPage, index: 1 },
      { title: 'Settings', icon: 'settings', component: SettingsPage }
    ];

    this.worker.initServiceWorker();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component !== SettingsPage) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.push(SettingsPage);
    }
  }
}
