import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello CheckoutPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  outerButton(data){
    console.log('\n\n\n\n\n outerClicked', data);
  }

  innerButton(data){
    data.stopPropogation();
    console.log('\n\n\n\n\n innerButton', data);
  }

}
