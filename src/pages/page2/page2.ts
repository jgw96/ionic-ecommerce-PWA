import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { NavController, ToastController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DataProvider } from '../..//providers/data.provider';
import { DetailPage } from '../detail/detail';
import { CheckoutPage } from '../checkout/checkout';

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
  noItems: boolean;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public storage: Storage) {

  }


  ionViewDidEnter() {
    this.dataProvider.getCart().then((value) => {
      this.items = value;
      if (value === null) {
        this.noItems = true;
      } else {
        this.noItems = false;
      }
    });

    let toast = this.toastCtrl.create({
      message: 'This is a demo and payment info will not be transmitted',
      duration: 3000
    });
    toast.present();
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
    if ('vibrate' in navigator) {
      this.storage.get('vibration').then((value) => {
        if (value === null || value === true) {
          navigator.vibrate(300);
        }
      });
    }
    this.prices = [];
    this.totalPrice = 0;
    let total = 0;
    this.buyItems = [];
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
        if (err.message !== undefined) {
          let modal = this.modalCtrl.create(CheckoutPage);
          modal.present();
        }
      });
    } else {
      let modal = this.modalCtrl.create(CheckoutPage);
      modal.present();
    }
  }

  public clearCart() {
    if ('vibrate' in navigator) {
      this.storage.get('vibration').then((value) => {
        if (value === null || value === true) {
          navigator.vibrate(300);
        }
      });
    };
    this.dataProvider.clearCart().then(() => {
      let toast = this.toastCtrl.create({
        message: 'Cart cleared',
        duration: 2500
      });
      toast.present().then(() => {
        this.items = [];
        this.noItems = true;
      });
    })
  }
}
