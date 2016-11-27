import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataProvider } from '../../providers/data.provider';
import { DetailPage } from '../detail/detail';
import { Page2 } from '../page2/page2';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
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
export class Page1 {

  public devices: any[];
  public cartNumber: number;
  public searchQuery: string = '';

  constructor(public navCtrl: NavController, public data: DataProvider) {

  }

  ionViewDidLoad() {
    this.data.getDevices().subscribe(data => {
      console.log(data);
      this.devices = data;
    },
      err => {
        console.error(err);
      });
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
  }

}
