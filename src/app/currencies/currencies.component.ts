import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  currencies: any[] = [];

  constructor(private currencyService: CurrencyService, private router: Router) { }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe(data => {
      this.currencies = data.slice(0,20);
    });
  }

  viewCurrency(code:string) {
    this.router.navigate(['/currency',code]);
  }

}
