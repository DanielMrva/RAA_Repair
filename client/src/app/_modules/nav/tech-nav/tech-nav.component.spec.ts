import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechNavComponent } from './tech-nav.component';

describe('TechNavComponent', () => {
  let component: TechNavComponent;
  let fixture: ComponentFixture<TechNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechNavComponent]
    });
    fixture = TestBed.createComponent(TechNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
