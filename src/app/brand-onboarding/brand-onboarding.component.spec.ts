import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandOnboardingComponent } from './brand-onboarding.component';

describe('BrandOnboardingComponent', () => {
  let component: BrandOnboardingComponent;
  let fixture: ComponentFixture<BrandOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandOnboardingComponent]
    });
    fixture = TestBed.createComponent(BrandOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
