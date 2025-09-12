import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralRegistrationComponent } from './referral-registration.component';

describe('ReferralRegistrationComponent', () => {
  let component: ReferralRegistrationComponent;
  let fixture: ComponentFixture<ReferralRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralRegistrationComponent]
    });
    fixture = TestBed.createComponent(ReferralRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
