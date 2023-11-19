import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyPaneComponent } from './loyalty-pane.component';

describe('LoyaltyPaneComponent', () => {
  let component: LoyaltyPaneComponent;
  let fixture: ComponentFixture<LoyaltyPaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltyPaneComponent]
    });
    fixture = TestBed.createComponent(LoyaltyPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
