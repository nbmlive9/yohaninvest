import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTodayReportComponent } from './wallet-today-report.component';

describe('WalletTodayReportComponent', () => {
  let component: WalletTodayReportComponent;
  let fixture: ComponentFixture<WalletTodayReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletTodayReportComponent]
    });
    fixture = TestBed.createComponent(WalletTodayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
