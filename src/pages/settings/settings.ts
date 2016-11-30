import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public notificationsValue: boolean;
  public vibrationsValue: boolean;

  constructor(public navCtrl: NavController, public storage: Storage) { }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
    this.storage.get('vibration').then((value) => {
      if (value === null || value === true) {
        this.vibrationsValue = true;
      } else {
        this.vibrationsValue = false;
      }
    });

    let notifySetting = localStorage.getItem('notifications');
    if (notifySetting === 'false' || notifySetting === null) {
      this.notificationsValue = false;
    } else {
      this.notificationsValue = true;
    }
  }

  public notifications() {
    console.log(this.notificationsValue);
    this.storage.set('notifications', this.notificationsValue);
  }

  public vibrations() {
    console.log(this.vibrationsValue);
    if ('vibrate' in navigator) {
      this.storage.get('vibration').then((value) => {
        if (value === null || value === true) {
          navigator.vibrate(300);
        }
      });
    };
    this.storage.set('vibration', this.vibrationsValue);
  }

}
