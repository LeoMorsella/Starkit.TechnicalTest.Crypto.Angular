import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarketService } from './market.service';

describe('MarketService', () => {
  let service: MarketService;
  let httpMock: HttpTestingController;
  const mockMarketOverview = {
    data: {
      market_cap_percentage: {
        bitcoin: 41.7,
        ethereum: 19.2
      },
      total_market_cap: {
        usd: 1500000000000
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarketService]
    });

    service = TestBed.inject(MarketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crearse', () => {
    expect(service).toBeTruthy();
  });

  describe('getMarketOverview', () => {
    it('Debe obtener los datos desde la API', () => {
      service.getMarketOverview().subscribe(data => {
        expect(data).toEqual(mockMarketOverview);
      });
      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(mockMarketOverview);
    });
    it('Debe manejar los errores cuando la API falla', () => {
      service.getMarketOverview().subscribe(
        () => fail('Debio de falla con un error'),
        (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        }
      );
      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.method).toBe('GET');
      req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
  });
});