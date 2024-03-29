import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestProductService } from '../shared/services/request-product.service';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss']
})
export class ProductRequestComponent implements OnInit{
  categories = ['Kids', 'Women', 'Men', 'Essentials', 'Electronics', 'Others'];
  productUpdateForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private requestProductService: RequestProductService) { }

  ngOnInit(): void {

    //generating the form builder
    this.productUpdateForm = this.formbuilder.group({
      quantity: this.formbuilder.control(1),
      title: this.formbuilder.control(''),
      category: this.formbuilder.control(''),
      description: this.formbuilder.control('')
    })
  }

  //submitting the form 
  submitForm():void {
    console.log(this.productUpdateForm);
    const prod = {
      category: this.productUpdateForm.value['category'],
      description: this.productUpdateForm.value['description'],
      quantity: this.productUpdateForm.value['quantity'],
      title: this.productUpdateForm.value['title'],
    }
    console.log(prod);
    this.requestProductService.postRequestProducts(prod).subscribe({
      next: (res) => {
        if (res.success === true) {
          alert("Succesfully Updated");
        }
        console.log(res);
      }
    });
    this.router.navigate(['/home-page']);
  }
}
