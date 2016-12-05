import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { NavController, ToastController, ItemSliding } from 'ionic-angular';

import { DataProvider } from '../../providers/data.provider';
import { DetailPage } from '../detail/detail';
import { Page2 } from '../page2/page2';

/*
  Generated class for the Ios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ios',
  templateUrl: 'ios.html',
  animations: [
    trigger('flyInLeft', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-150%)' }),
        animate('300ms 1000ms ease-out')
      ])
    ]),
    trigger('flyInRight', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(150%)' }),
        animate('300ms 1000ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms 1000ms ease-out')
      ])
    ])
  ]
})
export class IosPage {

  public devices: any[];
  public cartNumber: number;
  public searchQuery: string = '';
  public ios: boolean;
  public android: boolean;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public data: DataProvider) { }

  ionViewDidLoad() {
    this.getIosDevices();
  }

  ionViewDidEnter() {
    this.data.getCart().then((value) => {
      if (value !== null) {
        this.cartNumber = value.length;
      } else {
        this.cartNumber = 0;
      }
    });
  }

  public getIosDevices() {
    this.data.getIosDevices().subscribe(data => {
      this.devices = data;
      this.android = false;
      this.ios = true;
    },
      err => {
        console.error(err);
      })
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

  public openCart() {
    this.navCtrl.push(Page2);
  }

  public getItems(ev: any) {
    if (this.android === true) {
      // Reset items back to all of the items
      this.data.getDevices().subscribe(data => {
        this.devices = data;
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.devices = this.devices.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        }
      },
        err => {
          console.error(err);
        });
    } else {
      this.data.getIosDevices().subscribe(data => {
        this.devices = data;
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.devices = this.devices.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        }
      },
        err => {
          console.error(err);
        });
    }
  }

  public addToCart(slidingItem: ItemSliding, name, os, cpu, ram, image, price) {
    this.data.addToCart({
      deviceName: name,
      deviceOS: os,
      deviceCPU: cpu,
      deviceRam: ram,
      deviceImage: image,
      devicePrice: price
    }).then(() => {
      slidingItem.close();
      const toast = this.toastCtrl.create({
        message: 'Item added to cart',
        duration: 2500
      });
      toast.present().then(() => {
        this.data.getCart().then((value) => {
          if (value !== null) {
            this.cartNumber = value.length;
          } else {
            this.cartNumber = 0;
          }
        });
      })
    })
  }

}
