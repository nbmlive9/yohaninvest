import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonsecureUsersReportComponent } from './nonsecure-users-report.component';

describe('NonsecureUsersReportComponent', () => {
  let component: NonsecureUsersReportComponent;
  let fixture: ComponentFixture<NonsecureUsersReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonsecureUsersReportComponent]
    });
    fixture = TestBed.createComponent(NonsecureUsersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
