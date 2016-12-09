import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ServiceWorker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkerProvider {

  sub: any;

  constructor(private http: Http) {
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
      console.log(subscription);
      this.postEndpoint(subscription).subscribe((data) => {
        console.log(data);
      },
      err => {
        console.error(err);
      })
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

  postEndpoint(endpoint: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/newId', endpoint, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
