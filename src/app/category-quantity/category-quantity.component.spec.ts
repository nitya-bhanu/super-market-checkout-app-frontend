import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQuantityComponent } from './category-quantity.component';

describe('CategoryQuantityComponent', () => {
  let component: CategoryQuantityComponent;
  let fixture: ComponentFixture<CategoryQuantityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryQuantityComponent]
    });
    fixture = TestBed.createComponent(CategoryQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
