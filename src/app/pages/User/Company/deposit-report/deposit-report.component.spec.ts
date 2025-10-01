import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositReportComponent } from './deposit-report.component';

describe('DepositReportComponent', () => {
  let component: DepositReportComponent;
  let fixture: ComponentFixture<DepositReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositReportComponent]
    });
    fixture = TestBed.createComponent(DepositReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
