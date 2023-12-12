import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyRequestReasonComponent } from './deny-request-reason.component';

describe('DenyRequestReasonComponent', () => {
  let component: DenyRequestReasonComponent;
  let fixture: ComponentFixture<DenyRequestReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenyRequestReasonComponent]
    });
    fixture = TestBed.createComponent(DenyRequestReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
