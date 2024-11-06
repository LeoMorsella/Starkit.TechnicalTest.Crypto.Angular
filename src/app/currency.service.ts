import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  private coinsUrl = 'https://api.coinpaprika.com/v1/coins';

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(this.coinsUrl);
  }

  getCurrencyStats(symbol: string): Observable<any> {
    return this.http.get(`/api/v1/market/stats?symbol=${symbol}-USDT`);
  }
}
