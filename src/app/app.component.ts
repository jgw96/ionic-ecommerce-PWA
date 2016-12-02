import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SettingsPage } from '../pages/settings/settings';

declare var Notification: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'IonicPhones', icon: 'home', component: Page1 },
      { title: 'Cart', icon: 'cart', component: Page2 },
      { title: 'Settings', icon: 'settings', component: SettingsPage }
    ];

    this.initServiceWorker();
  }

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      (window as any).requestIdleCallback(() => {
        navigator.serviceWorker.register('service-worker.js')
          .then((subscription: any) => {
            console.log('service worker registered');
            setTimeout(() => {
              subscription.pushManager.subscribe({ userVisibleOnly: true }).then((subscription) => {
                localStorage.setItem('sub', subscription);
                const endpoint = subscription.endpoint;
                const key = subscription.getKey('p256dh');
                console.log(endpoint, key);
                localStorage.setItem('notifications', 'true');
              }).catch((e) => {
                if (Notification.permission === 'denied') {
                  console.warn('Permission for Notifications was denied');
                  localStorage.setItem('notifications', 'false');
                } else {
                  localStorage.setItem('notifications', 'false');
                  console.error('Unable to subscribe to push.', e);
                }
              });
            }, 4000);
          })
          .catch(err => console.log('Error', err));
      });
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
