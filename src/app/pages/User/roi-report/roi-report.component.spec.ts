import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiReportComponent } from './roi-report.component';

describe('RoiReportComponent', () => {
  let component: RoiReportComponent;
  let fixture: ComponentFixture<RoiReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoiReportComponent]
    });
    fixture = TestBed.createComponent(RoiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
