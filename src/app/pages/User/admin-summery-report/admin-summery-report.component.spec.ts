import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSummeryReportComponent } from './admin-summery-report.component';

describe('AdminSummeryReportComponent', () => {
  let component: AdminSummeryReportComponent;
  let fixture: ComponentFixture<AdminSummeryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSummeryReportComponent]
    });
    fixture = TestBed.createComponent(AdminSummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
