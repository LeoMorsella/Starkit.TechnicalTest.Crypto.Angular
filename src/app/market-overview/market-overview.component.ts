import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss']
})
export class MarketOverviewComponent implements OnInit {

  marketOverviewPercentage: any;
  marketOverviewTotalMarket: any;
  marketOverviewTotalVolume:any;
  marketOverviewActiveCrypto:any;

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.marketService.getMarketOverview().subscribe(response => {
      this.marketOverviewPercentage = Object.entries(response.data.market_cap_percentage)
      .slice(0, 10)
      .map(entry => ({
        name: entry[0].toUpperCase(),
        marketCapPercentage: formatNumber(entry[1])
      }));
      this.marketOverviewTotalMarket = Object.entries(response.data.total_market_cap)
      .slice(0, 10)
      .map(entry => ({
        name: entry[0].toUpperCase(),
        marketCapValue: formatNumber(entry[1])
      }));
      this.marketOverviewTotalVolume = Object.entries(response.data.total_volume)
      .slice(0, 10)
      .map(entry => ({
        name: entry[0].toUpperCase(),
        marketCapVolume: formatNumber(entry[1])
      }));
    })
  }
}

function formatNumber(number:any) {
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
