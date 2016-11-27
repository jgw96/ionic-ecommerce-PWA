import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';

import { DataProvider } from '../../providers/data.provider';

/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  public title: string;
  public os: string;
  public cpu: string;
  public ram: string;
  public image: string;
  public price: string;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public dataProvider: DataProvider) { }

  ionViewDidLoad() {
    this.title = this.params.data.name;
    this.os = this.params.data.os;
    this.cpu = this.params.data.cpu;
    this.ram = this.params.data.ram;
    this.image = this.params.data.image
    this.price = this.params.data.price.toString();
  }

  public buyButton() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Buy this item',
      buttons: [
        {
          text: 'Add to cart',
          icon: 'cart',
          handler: () => {
            this.addItem().then(() => {
              const toast = this.toastCtrl.create({
                message: 'Item added to cart',
                duration: 2500
              });
              toast.present();
            })
          }
        }, {
          text: 'Subscribe to product updates',
          icon: 'notifications',
          handler: () => {
            console.log('notify');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public addItem() {
    return this.dataProvider.addToCart({
      deviceName: this.title,
      deviceOS: this.os,
      deviceCPU: this.cpu,
      deviceRam: this.ram,
      deviceImage: this.image,
      devicePrice: this.price
    });
  }

  public share() {
    (navigator as any).share({
      title: this.title,
      text: `
      Check out this awesome deal I found on the ${this.title}.
      Only ${this.price} dollars!
      `,
      url: window.location.href
    }).then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing:', error));
  }

}
