import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResultsPageComponent } from './user-results-page.component';

describe('UserResultsPageComponent', () => {
  let component: UserResultsPageComponent;
  let fixture: ComponentFixture<UserResultsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserResultsPageComponent]
    });
    fixture = TestBed.createComponent(UserResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
