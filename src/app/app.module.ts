import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { DetailPage } from '../pages/detail/detail';
import { CheckoutPage } from '../pages/checkout/checkout';
import { SettingsPage } from '../pages/settings/settings';
import { DataProvider } from '../providers/data.provider';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'a32ef773'
  }
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    DetailPage,
    CheckoutPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    DetailPage,
    CheckoutPage,
    SettingsPage
  ],
  providers: [DataProvider, Storage]
})
export class AppModule {}
