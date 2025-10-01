import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureUsersReportComponent } from './secure-users-report.component';

describe('SecureUsersReportComponent', () => {
  let component: SecureUsersReportComponent;
  let fixture: ComponentFixture<SecureUsersReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureUsersReportComponent]
    });
    fixture = TestBed.createComponent(SecureUsersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
