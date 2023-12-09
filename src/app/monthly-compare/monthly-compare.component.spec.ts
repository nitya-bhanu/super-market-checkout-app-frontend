import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCompareComponent } from './monthly-compare.component';

describe('MonthlyCompareComponent', () => {
  let component: MonthlyCompareComponent;
  let fixture: ComponentFixture<MonthlyCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyCompareComponent]
    });
    fixture = TestBed.createComponent(MonthlyCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
