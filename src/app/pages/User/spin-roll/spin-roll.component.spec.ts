import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinRollComponent } from './spin-roll.component';

describe('SpinRollComponent', () => {
  let component: SpinRollComponent;
  let fixture: ComponentFixture<SpinRollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinRollComponent]
    });
    fixture = TestBed.createComponent(SpinRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
