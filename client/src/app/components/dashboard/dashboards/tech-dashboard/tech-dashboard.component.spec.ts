import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDashboardComponent } from './tech-dashboard.component';

describe('TechDashboardComponent', () => {
  let component: TechDashboardComponent;
  let fixture: ComponentFixture<TechDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechDashboardComponent]
    });
    fixture = TestBed.createComponent(TechDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
