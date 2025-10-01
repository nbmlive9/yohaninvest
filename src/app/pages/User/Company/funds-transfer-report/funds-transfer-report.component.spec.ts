import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsTransferReportComponent } from './funds-transfer-report.component';

describe('FundsTransferReportComponent', () => {
  let component: FundsTransferReportComponent;
  let fixture: ComponentFixture<FundsTransferReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundsTransferReportComponent]
    });
    fixture = TestBed.createComponent(FundsTransferReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
