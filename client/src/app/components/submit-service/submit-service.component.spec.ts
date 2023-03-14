import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitServiceComponent } from './submit-service.component';

describe('SubmitServiceComponent', () => {
  let component: SubmitServiceComponent;
  let fixture: ComponentFixture<SubmitServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
