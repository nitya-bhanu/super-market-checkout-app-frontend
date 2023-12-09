import { Component, OnInit } from '@angular/core';
import { prodcutsSchema, productsList } from '../shared/models/prodcuts';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared/services/shared-data.service';
import { CartService } from '../shared/services/cart.service';
import { UserService } from '../shared/services/user.service';
import { OrderService } from '../shared/services/order.service';
import { orderSchema } from '../shared/models/orders';
import { ProductAndQuantityList } from '../shared/models/productAndQuantityList';
import { prodcutsList } from '../shared/models/cart';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  productsList!: Array<prodcutsSchema>;

  freqProductsList!: Array<prodcutsSchema>;

  FetchedProduct!: prodcutsSchema
  category = '';
  prodId = '';
  uId = '';
  userRole!: string;
  allOrders!: Array<orderSchema>;


  freqProductAndQuantityList!: prodcutsList[];
  freqBoughtProdcuts!: Array<string>;

  relatedFreqBoughtProducts!: Array<string>;

  constructor(private productService: ProductsService, private route: Router, private activatedRoute: ActivatedRoute, private sharedDataService: SharedDataService, private cartService: CartService, private sharedDataServices: SharedDataService, private orderService: OrderService) {
    this.uId = this.sharedDataService.getUserResponse().userId;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(e => {
      const id = e['prodId'];
      this.getSingleProduct(id);

      this.prodId = id;
    })

    this.userRole = this.sharedDataService.getUserResponse().role;
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
        // console.log('All products: ', resp.data);
        this.productsList = resp.data;
        this.getFreqBoughtProductsId();
      },
      error: (err) => {
        console.log('Error Fetching: ', err);
      }
    })
  }

  getFreqBoughtProductsId(): void {
    this.orderService.getAllOrders().subscribe({
      next: (resp) => {
        this.allOrders = resp;
        // console.log('Here: ', this.allOrders);
        this.saveRelatedProductsArray();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveRelatedProductsArray() {
    let bool = false;
    this.allOrders.forEach(e => {
      e.productAndQuantityList.forEach(e => {
        if (e.productId === this.prodId)
          bool = true;
      })
      if (bool === true) {
        // console.log('Yes related products found');
        if (!this.freqProductAndQuantityList) {
          this.freqProductAndQuantityList = e.productAndQuantityList;
        }
        else
          this.freqProductAndQuantityList.push(...e.productAndQuantityList);
      }
    })
    this.saveRelatedProducuts();
  }

  saveRelatedProducuts() {
    this.freqProductAndQuantityList.forEach(e => {
      if (!this.freqBoughtProdcuts) {
        this.freqBoughtProdcuts = [];
        this.freqBoughtProdcuts[0] = e.productId;
      }
      else
        this.freqBoughtProdcuts.push(e.productId);
    })
    this.getRelatedProductsId();
  }

  getRelatedProductsId() {
    this.freqBoughtProdcuts.forEach(e => {
      if (!this.relatedFreqBoughtProducts) {
        this.relatedFreqBoughtProducts = []
        this.relatedFreqBoughtProducts[0] = e;
      }
      else
        this.relatedFreqBoughtProducts.push(e);
    })
    this.bringAllRelatedProducts();
  }

  bringAllRelatedProducts() {
    this.relatedFreqBoughtProducts.forEach(e => {
      this.productService.getProductById(e).subscribe({
        next: (resp) => {

          // console.log(this.freqProductsList);

          // console.log('Final Check Response: ', resp.data);
          if (!this.freqProductsList) {
            this.freqProductsList = [];
            this.freqProductsList[0] = resp.data;
          }
          else
            this.freqProductsList.push(resp.data);
        },
        error: (err) => {
          console.log('something bad happened', err);
        },
        complete: () => {
          this.freqProductsList = this.freqProductsList.filter(e => {
            // console.log(e.prodId + ' ' + this.prodId);
            return e.prodId !== this.prodId;
          })
        }
      })
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

    const x = document.getElementById('add-cart-btn');
    x!.innerText = 'Added';

    //posting the cart into cart collections of a particular user
    this.cartService.postCartDetails(cartDetails).subscribe({
      next: (res: any) => {
        console.log(res);
      }
    })
  }

}
