import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {
  productUpdateForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private productService: ProductsService) { }

  ngOnInit(): void {
    this.productUpdateForm = this.formbuilder.group({
      quantity: this.formbuilder.control(1),
      price: this.formbuilder.control(0.0),
      title: this.formbuilder.control(''),
      category: this.formbuilder.control(''),
      description: this.formbuilder.control(''),
      imageUrl: this.formbuilder.control('')
    })
  }

  submitForm() {
    console.log(this.productUpdateForm);
    const prod = {
      category: this.productUpdateForm.value['category'],
      description: this.productUpdateForm.value['description'],
      imageUrl: this.productUpdateForm.value['imageUrl'],
      price: this.productUpdateForm.value['price'],
      prodId: this.productUpdateForm.value['prodId'],
      quantity: this.productUpdateForm.value['quantity'],
      title: this.productUpdateForm.value['title'],
      rating: 0
    }
    console.log(prod);
    this.productService.addProducts(prod).subscribe({
      next: (res) => {
        if (res.success === true) {
          alert("Succesfully Updated");
        }
        console.log(res);
      }
    });
    this.router.navigate(['admin-page']);
  }
}
