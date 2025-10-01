import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiReportAdminComponent } from './roi-report-admin.component';

describe('RoiReportAdminComponent', () => {
  let component: RoiReportAdminComponent;
  let fixture: ComponentFixture<RoiReportAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoiReportAdminComponent]
    });
    fixture = TestBed.createComponent(RoiReportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
