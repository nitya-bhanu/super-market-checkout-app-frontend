import { Component, OnInit } from '@angular/core';
import { prodcutsSchema } from '../shared/models/prodcuts';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  productsList!: Array<prodcutsSchema>;
  FetchedProduct!: prodcutsSchema
  category:string='';
  constructor(private productService: ProductsService, private route: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(e => {
      const id = e['prodId'];
      this.getSingleProduct(id);
    })
  }

  getSingleProduct(id: string) {
    return this.productService.getProductById(id).subscribe({
      next: (resp) => {
        this.FetchedProduct = resp.data;
        this.category=resp.data.category;
        this.getAllProducts();
      }
    })
  }
  getAllProducts() {
    return this.productService.getProducts(0, 100, 'asc', '', this.category, '').subscribe({
      next: (resp) => {
        console.log('All products: ',resp.data);
        this.productsList = resp.data;
      },
      error:(err)=>{
        console.log('Error Fetching: ',err);
      }
    })
  }

}
