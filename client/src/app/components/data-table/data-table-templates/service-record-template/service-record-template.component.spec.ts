import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRecordTemplateComponent } from './service-record-template.component';

describe('ServiceRecordTemplateComponent', () => {
  let component: ServiceRecordTemplateComponent;
  let fixture: ComponentFixture<ServiceRecordTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRecordTemplateComponent]
    });
    fixture = TestBed.createComponent(ServiceRecordTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
