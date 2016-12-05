import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WorkerProvider } from '../../providers/worker.provider';

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

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public worker: WorkerProvider,
    public toastCtrl: ToastController) { }

  ionViewDidLoad() {
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
    if ('vibrate' in navigator) {
      this.storage.get('vibration').then((value) => {
        if (value === null || value === true) {
          navigator.vibrate(300);
        }
      })
    };
    console.log(this.notificationsValue);
    this.storage.set('notifications', this.notificationsValue);

    if (this.notificationsValue === true) {
      this.worker.subscribe();
    } else {
      this.worker.unsubscribe();
      let toast = this.toastCtrl.create({
        message: 'Unsubscribed from notifications',
        duration: 2500
      });
      toast.present();
    }
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

  public visitOnGithub() {
    window.open('https://github.com/jgw96/ionic-ecommerce-PWA');
  }

}
