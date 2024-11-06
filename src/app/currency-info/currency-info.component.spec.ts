import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyInfoComponent } from './currency-info.component';
import { CurrencyService } from '../currency.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CurrencyInfoComponent', () => {
  let component: CurrencyInfoComponent;
  let fixture: ComponentFixture<CurrencyInfoComponent>;
  let currencyService: CurrencyService;
  let activatedRoute: ActivatedRoute;
  const mockCurrencyStats = {
    data: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap: 700000000000,
      price: 35000
    }
  };
  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (key: string) => key === 'code' ? 'bitcoin' : null
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CurrencyInfoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        CurrencyService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyInfoComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
  it('No debe llamar al servicio si no se envia un dato valido', () => {
    activatedRouteMock.snapshot.paramMap.get = () => null;
    spyOn(currencyService, 'getCurrencyStats');
    component.ngOnInit();
    fixture.detectChanges();
    expect(currencyService.getCurrencyStats).not.toHaveBeenCalled();
    expect(component.currencyInfo).toBeUndefined();
  });
});
