import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';
import { Database } from '@ionic/cloud-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {

  cartItems: any[];

  constructor(public http: Http, public storage: Storage, public db: Database) {
    this.storage.get('cart').then((value) => {
      if (value === null) {
        this.cartItems = [];
      } else {
        this.cartItems = value;
      }
    });
    this.db.connect();
  }

  public getDevices(): Observable<any> {
    const androidDevices = this.db.collection('androidDevices');
    return androidDevices.fetch();
  }

  public getIosDevices(): Observable<any> {
    const androidDevices = this.db.collection('iosDevices');
    return androidDevices.fetch();
  }

  public addToCart(item: any): Promise<any> {
    this.cartItems.push(item);
    return this.storage.set('cart', this.cartItems);
  }

  public clearCart(): Promise<any> {
    this.cartItems = [];
    return this.storage.remove('cart');
  }

  public getCart(): Promise<any> {
    return this.storage.get('cart');
  }

}
