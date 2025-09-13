import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositFundComponent } from './deposit-fund.component';

describe('DepositFundComponent', () => {
  let component: DepositFundComponent;
  let fixture: ComponentFixture<DepositFundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositFundComponent]
    });
    fixture = TestBed.createComponent(DepositFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
