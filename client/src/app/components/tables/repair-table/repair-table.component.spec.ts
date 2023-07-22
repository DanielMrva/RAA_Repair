import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTableComponent } from './repair-table.component';

describe('RepairTableComponent', () => {
  let component: RepairTableComponent;
  let fixture: ComponentFixture<RepairTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairTableComponent]
    });
    fixture = TestBed.createComponent(RepairTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
