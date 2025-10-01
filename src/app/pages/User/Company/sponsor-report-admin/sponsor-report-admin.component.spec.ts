import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorReportAdminComponent } from './sponsor-report-admin.component';

describe('SponsorReportAdminComponent', () => {
  let component: SponsorReportAdminComponent;
  let fixture: ComponentFixture<SponsorReportAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorReportAdminComponent]
    });
    fixture = TestBed.createComponent(SponsorReportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
