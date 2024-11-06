import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.component.html',
  styleUrls: ['./currency-info.component.scss']
})
export class CurrencyInfoComponent implements OnInit {

  currencyInfo:any;

  constructor(private route: ActivatedRoute, private currencyService: CurrencyService) { }

  ngOnInit() {
    const symbol = this.route.snapshot.paramMap.get('code');
    if (symbol) {
      this.currencyService.getCurrencyStats(symbol).subscribe(response => {
        this.currencyInfo = response.data;
      });
    }
  }
}

