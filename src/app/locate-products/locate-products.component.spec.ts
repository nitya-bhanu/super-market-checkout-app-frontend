import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateProductsComponent } from './locate-products.component';

describe('LocateProductsComponent', () => {
  let component: LocateProductsComponent;
  let fixture: ComponentFixture<LocateProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocateProductsComponent]
    });
    fixture = TestBed.createComponent(LocateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
