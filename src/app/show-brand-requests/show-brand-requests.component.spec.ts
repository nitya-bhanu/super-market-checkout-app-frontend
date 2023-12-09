import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBrandRequestsComponent } from './show-brand-requests.component';

describe('ShowBrandRequestsComponent', () => {
  let component: ShowBrandRequestsComponent;
  let fixture: ComponentFixture<ShowBrandRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowBrandRequestsComponent]
    });
    fixture = TestBed.createComponent(ShowBrandRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
