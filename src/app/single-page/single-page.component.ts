import { Component, OnInit } from '@angular/core';
import { prodcutsSchema } from '../shared/models/prodcuts';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared/services/shared-data.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  productsList!: Array<prodcutsSchema>;
  FetchedProduct!: prodcutsSchema
  category = '';
  prodId='';
  constructor(private productService: ProductsService, private route: Router, private activatedRoute: ActivatedRoute,private sharedDataService: SharedDataService, private cartService:CartService) {
  }
  uId: string = this.sharedDataService.getUserResponse().userId;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(e => { 
      const id = e['prodId'];
      this.getSingleProduct(id);
      this.prodId=id;
    })
  }


  //fetching the products by ID
  getSingleProduct(id: string) {
    return this.productService.getProductById(id).subscribe({
      next: (resp) => {
        this.FetchedProduct = resp.data;
        this.category = resp.data.category;
        this.getAllProducts();
      }
    })
  }

  //getting all the products 
  getAllProducts(): void {
    this.productService.getProducts(0, 100, 'asc', '', this.category, '').subscribe({
      next: (resp) => {
        console.log('All products: ', resp.data);
        this.productsList = resp.data;
      },
      error: (err) => {
        console.log('Error Fetching: ', err);
      }
    })
  }


  addToCart() {
    const cartDetails = {
      userId: this.uId,
      productAndQuantityList: [
        {
          productId: this.prodId,
          orderedProductQuantity: 1
        }
      ]
    }

    const x=document.getElementById('add-cart-btn');
    x!.innerText='Added';

    //posting the cart into cart collections of a particular user
    this.cartService.postCartDetails(cartDetails).subscribe({
      next: (res:any) => {
        console.log(res);
      }
    })
  }

}
