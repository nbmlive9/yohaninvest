import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingCashBackReportComponent } from './matching-cash-back-report.component';

describe('MatchingCashBackReportComponent', () => {
  let component: MatchingCashBackReportComponent;
  let fixture: ComponentFixture<MatchingCashBackReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchingCashBackReportComponent]
    });
    fixture = TestBed.createComponent(MatchingCashBackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
