import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrenciesComponent } from './currencies.component';
import { CurrencyService } from '../currency.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CurrenciesComponent', () => {
  let component: CurrenciesComponent;
  let fixture: ComponentFixture<CurrenciesComponent>;
  let currencyService: CurrencyService;
  let router: Router;
  const mockCurrencies = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule], 
      declarations: [CurrenciesComponent],
      providers: [CurrencyService]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe obtener las monedas en Init', () => {
    spyOn(currencyService, 'getCurrencies').and.returnValue(of(mockCurrencies));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.currencies.length).toBe(2);
    expect(component.currencies[0].name).toBe('Bitcoin');
    expect(component.currencies[1].name).toBe('Ethereum');
  });

  it('Debe invocar el Router para acceder a los detalles de las criptomonedas', () => {
    spyOn(router, 'navigate');
    component.viewCurrency('bitcoin');
    expect(router.navigate).toHaveBeenCalledWith(['/currency', 'bitcoin']);
  });
});
