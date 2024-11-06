import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  const mockCurrencies = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
  ];

  const mockCurrencyStats = {
    symbol: 'BTC-USDT',
    price: '45000',
    volume_24h: '35000000'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crearse', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrencies', () => {
    it('Debe obtener los datos desde la API', () => {
      service.getCurrencies().subscribe(currencies => {
        expect(currencies).toEqual(mockCurrencies);
      });
      const req = httpMock.expectOne('https://api.coinpaprika.com/v1/coins');
      expect(req.request.method).toBe('GET');
      req.flush(mockCurrencies);
    });

    it('Debe manejar los errores cuando la API falla', () => {
      service.getCurrencies().subscribe(
        () => fail('Debio de fallar con un error'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );
      const req = httpMock.expectOne('https://api.coinpaprika.com/v1/coins');
      expect(req.request.method).toBe('GET');
      req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getCurrencyStats', () => {
    it('Debe obtener la informacion de la moneda desde la API', () => {
      const symbol = 'BTC';

      service.getCurrencyStats(symbol).subscribe(stats => {
        expect(stats).toEqual(mockCurrencyStats);
      });
      const req = httpMock.expectOne(`/api/v1/market/stats?symbol=${symbol}-USDT`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCurrencyStats);
    });

    it('Debe manejar los errores cuando la API falla', () => {
      const symbol = 'BTC';

      service.getCurrencyStats(symbol).subscribe(
        () => fail('should have failed with an error'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );
      const req = httpMock.expectOne(`/api/v1/market/stats?symbol=${symbol}-USDT`);
      expect(req.request.method).toBe('GET');
      req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
  });
});