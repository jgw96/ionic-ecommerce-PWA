import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceWorker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkerProvider {

  sub: any;

  constructor() {
    console.log('Hello ServiceWorker Provider');
  }

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then((subscription: any) => {
          console.log('service worker registered');
          setTimeout(() => {
            this.sub = subscription;
          }, 3000);
        })
        .catch(err => console.log('Error', err));
    }
  }

  unsubscribe() {
    this.sub.pushManager.getSubscription().then((pushSub: any) => {
      pushSub.unsubscribe().then(() => {
        console.log('unsubscribed');
      }).catch((e: Error) => {
        console.error(e);
      });
    });
  }

  subscribe() {
    this.sub.pushManager.subscribe({ userVisibleOnly: true }).then((subscription) => {
      localStorage.setItem('notifications', 'true');
    }).catch((e) => {
      if ((window as any).Notification.permission === 'denied') {
        console.warn('Permission for Notifications was denied');
        localStorage.setItem('notifications', 'false');
      } else {
        localStorage.setItem('notifications', 'false');
        console.error('Unable to subscribe to push.', e);
      }
    });
  }

}
