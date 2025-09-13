import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletMatchingReportComponent } from './wallet-matching-report.component';

describe('WalletMatchingReportComponent', () => {
  let component: WalletMatchingReportComponent;
  let fixture: ComponentFixture<WalletMatchingReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletMatchingReportComponent]
    });
    fixture = TestBed.createComponent(WalletMatchingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
