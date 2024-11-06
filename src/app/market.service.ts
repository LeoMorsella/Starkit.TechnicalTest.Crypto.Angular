import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private marketUrl = 'https://cryptingup.com/api/markets';
  private baseUrl = "https://api.coingecko.com/api/v3/global";
  constructor(private http: HttpClient) { }

  getMarketOverview(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  
}
