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

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public dataProvider: DataProvider) { }


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
    if ((window as any).PaymentRequest) {
      const request = new (window as any).PaymentRequest(
        [
          {
            supportedMethods: ["visa", "mastercard"]
          }
        ],
        {
          displayItems: [
            {
              label: 'Devices',
              amount: { currency: "USD", value: "65.00" }, // US$65.00
            }
          ],
          total: {
            label: "Total",
            amount: { currency: "USD", value: "55.00" }, // US$55.00
          }
        }
      );

      request.show().then((paymentResponse) => {
        // Process paymentResponse here
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
