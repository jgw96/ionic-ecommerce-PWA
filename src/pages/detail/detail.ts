import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public params: NavParams, public actionSheetCtrl: ActionSheetController) { }

  ionViewDidLoad() {
    console.log(this.params.data);
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
          text: 'Buy Now',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
