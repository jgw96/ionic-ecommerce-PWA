import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { NavController, ToastController, NavParams } from 'ionic-angular';

import { DataProvider } from '../..//providers/data.provider';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms 300ms ease-out')
      ])
    ])
  ]
})
export class Page2 {
  items: any[];
  prices: any[];
  totalPrice: number;
  buyItems: any[];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public dataProvider: DataProvider) {
    this.prices = [];
    this.buyItems = [];
  }


  ionViewDidEnter() {
    this.dataProvider.getCart().then((value) => {
      this.items = value;
    });
  }

  public detail(ram: string, cpu: string, price: number, OS: string, name: string, image: string) {
    this.navCtrl.push(DetailPage, {
      ram: ram,
      cpu: cpu,
      price: price,
      os: OS,
      name: name,
      image: image
    });
  }

  public checkout() {
    let total = 0;
    this.items.forEach((item) => {
      this.prices.push(item.devicePrice);
      this.buyItems.push({
        label: item.deviceName,
        amount: { currency: "USD", value: item.devicePrice }
      });
    });
    this.prices.forEach((price) => {
      let parsedPrice = parseInt(price);
      total = total + parsedPrice;
    });
    this.totalPrice = total;
    if ((window as any).PaymentRequest) {
      console.log(this.buyItems);
      const request = new (window as any).PaymentRequest(
        [
          {
            supportedMethods: ["visa", "mastercard"]
          }
        ],
        {
          displayItems: this.buyItems,
          total: {
            label: "Total",
            amount: { currency: "USD", value: this.totalPrice }
          }
        }
      );

      request.show().then((paymentResponse) => {
        paymentResponse.complete("success");
      }).catch((err) => {
        console.error("Uh oh, something bad happened", err.message);
      });
    }
  }

  public clearCart() {
    this.dataProvider.clearCart().then(() => {
      let toast = this.toastCtrl.create({
        message: 'Cart cleared',
        duration: 2500
      });
      toast.present().then(() => {
        this.items = [];
      });
    })
  }
}
