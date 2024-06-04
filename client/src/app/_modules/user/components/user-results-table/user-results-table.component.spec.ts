import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResultsTableComponent } from './user-results-table.component';

describe('UserResultsTableComponent', () => {
  let component: UserResultsTableComponent;
  let fixture: ComponentFixture<UserResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserResultsTableComponent]
    });
    fixture = TestBed.createComponent(UserResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
