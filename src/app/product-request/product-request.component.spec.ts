import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestComponent } from './product-request.component';

describe('ProductRequestComponent', () => {
  let component: ProductRequestComponent;
  let fixture: ComponentFixture<ProductRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRequestComponent]
    });
    fixture = TestBed.createComponent(ProductRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
