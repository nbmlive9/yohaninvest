import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalUsersListComponent } from './total-users-list.component';

describe('TotalUsersListComponent', () => {
  let component: TotalUsersListComponent;
  let fixture: ComponentFixture<TotalUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalUsersListComponent]
    });
    fixture = TestBed.createComponent(TotalUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
