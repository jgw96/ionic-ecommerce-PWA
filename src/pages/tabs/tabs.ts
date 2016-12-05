import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Page1 } from '../page1/page1';
import { IosPage } from '../ios/ios';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mySelectedIndex: number;
  public tab1Root = Page1;
  public tab2Root = IosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
