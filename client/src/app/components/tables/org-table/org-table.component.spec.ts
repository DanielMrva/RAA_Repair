import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTableComponent } from './org-table.component';

describe('OrgTableComponent', () => {
  let component: OrgTableComponent;
  let fixture: ComponentFixture<OrgTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgTableComponent]
    });
    fixture = TestBed.createComponent(OrgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
