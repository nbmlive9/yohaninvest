import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryReportComponent } from './binary-report.component';

describe('BinaryReportComponent', () => {
  let component: BinaryReportComponent;
  let fixture: ComponentFixture<BinaryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryReportComponent]
    });
    fixture = TestBed.createComponent(BinaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
