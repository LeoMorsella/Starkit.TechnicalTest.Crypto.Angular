import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketOverviewComponent } from './market-overview.component';
import { MarketService } from '../market.service';
import { of } from 'rxjs';

describe('MarketOverviewComponent', () => {
  let component: MarketOverviewComponent;
  let fixture: ComponentFixture<MarketOverviewComponent>;
  let mockMarketService: jasmine.SpyObj<MarketService>;

  beforeEach(async () => {
    mockMarketService = jasmine.createSpyObj('MarketService', ['getMarketOverview']);
    
    await TestBed.configureTestingModule({
      declarations: [MarketOverviewComponent],
      providers: [
        { provide: MarketService, useValue: mockMarketService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketOverviewComponent);
    component = fixture.componentInstance;
  });

  it('Debe obtener los datos al realizar el Init', () => {
    const mockResponse = {
      data: {
        market_cap_percentage: {
          bitcoin: 60.5,
          ethereum: 10.3,
          ripple: 5.2
        },
        total_market_cap: {
          bitcoin: 1000000,
          ethereum: 500000,
          ripple: 200000
        },
        total_volume: {
          bitcoin: 500000,
          ethereum: 300000,
          ripple: 100000
        }
      }
    };
    mockMarketService.getMarketOverview.and.returnValue(of(mockResponse));
    fixture.detectChanges(); 
    expect(component.marketOverviewPercentage).toEqual([
      { name: 'BITCOIN', marketCapPercentage: '60.50' },
      { name: 'ETHEREUM', marketCapPercentage: '10.30' },
      { name: 'RIPPLE', marketCapPercentage: '5.20' }
    ]);
    
    expect(component.marketOverviewTotalMarket).toEqual([
      { name: 'BITCOIN', marketCapValue: '1,000,000.00' },
      { name: 'ETHEREUM', marketCapValue: '500,000.00' },
      { name: 'RIPPLE', marketCapValue: '200,000.00' }
    ]);
    
    expect(component.marketOverviewTotalVolume).toEqual([
      { name: 'BITCOIN', marketCapVolume: '500,000.00' },
      { name: 'ETHEREUM', marketCapVolume: '300,000.00' },
      { name: 'RIPPLE', marketCapVolume: '100,000.00' }
    ]);
  });
});