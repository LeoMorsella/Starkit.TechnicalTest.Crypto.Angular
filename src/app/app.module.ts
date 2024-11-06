import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrencyInfoComponent } from './currency-info/currency-info.component';
import { MarketOverviewComponent } from './market-overview/market-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    CurrencyInfoComponent,
    MarketOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
