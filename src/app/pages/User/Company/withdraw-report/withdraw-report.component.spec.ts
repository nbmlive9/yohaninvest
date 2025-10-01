import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawReportComponent } from './withdraw-report.component';

describe('WithdrawReportComponent', () => {
  let component: WithdrawReportComponent;
  let fixture: ComponentFixture<WithdrawReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawReportComponent]
    });
    fixture = TestBed.createComponent(WithdrawReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
