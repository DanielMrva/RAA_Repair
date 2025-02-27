import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSearchComponent } from './org-search.component';

describe('OrgSearchComponent', () => {
  let component: OrgSearchComponent;
  let fixture: ComponentFixture<OrgSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSearchComponent]
    });
    fixture = TestBed.createComponent(OrgSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
