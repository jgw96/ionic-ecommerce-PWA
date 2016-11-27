import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { DetailPage } from '../pages/detail/detail';
import { CheckoutPage } from '../pages/checkout/checkout';
import { DataProvider } from '../providers/data.provider';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    DetailPage,
    CheckoutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    DetailPage,
    CheckoutPage
  ],
  providers: [DataProvider, Storage]
})
export class AppModule {}
