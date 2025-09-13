import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingRoiReportComponent } from './matching-roi-report.component';

describe('MatchingRoiReportComponent', () => {
  let component: MatchingRoiReportComponent;
  let fixture: ComponentFixture<MatchingRoiReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchingRoiReportComponent]
    });
    fixture = TestBed.createComponent(MatchingRoiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
