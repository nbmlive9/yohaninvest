import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferReportComponent } from './transfer-report.component';

describe('TransferReportComponent', () => {
  let component: TransferReportComponent;
  let fixture: ComponentFixture<TransferReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferReportComponent]
    });
    fixture = TestBed.createComponent(TransferReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
