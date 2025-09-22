import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherActivationComponent } from './other-activation.component';

describe('OtherActivationComponent', () => {
  let component: OtherActivationComponent;
  let fixture: ComponentFixture<OtherActivationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherActivationComponent]
    });
    fixture = TestBed.createComponent(OtherActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
