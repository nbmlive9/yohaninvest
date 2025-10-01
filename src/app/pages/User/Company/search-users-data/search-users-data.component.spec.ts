import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersDataComponent } from './search-users-data.component';

describe('SearchUsersDataComponent', () => {
  let component: SearchUsersDataComponent;
  let fixture: ComponentFixture<SearchUsersDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUsersDataComponent]
    });
    fixture = TestBed.createComponent(SearchUsersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
