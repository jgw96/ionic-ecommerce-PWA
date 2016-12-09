import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { DetailPage } from '../pages/detail/detail';
import { CheckoutPage } from '../pages/checkout/checkout';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { IosPage } from '../pages/ios/ios';
import { DataProvider } from '../providers/data.provider';
import { WorkerProvider } from '../providers/worker.provider';

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
    SettingsPage,
    TabsPage,
    IosPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      tabsHideOnSubPages: true
    }),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    DetailPage,
    CheckoutPage,
    SettingsPage,
    TabsPage,
    IosPage
  ],
  providers: [DataProvider, WorkerProvider, Storage]
})
export class AppModule {}
