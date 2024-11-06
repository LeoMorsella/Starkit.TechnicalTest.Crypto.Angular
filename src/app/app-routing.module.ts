import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrencyInfoComponent } from './currency-info/currency-info.component';
import { MarketOverviewComponent } from './market-overview/market-overview.component';
const routes: Routes = [
  {path: '', component: CurrenciesComponent},
  {path:'currency/:code', component: CurrencyInfoComponent},
  {path:'market-overview',component:MarketOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
