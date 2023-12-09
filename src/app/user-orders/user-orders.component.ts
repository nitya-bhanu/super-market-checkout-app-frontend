import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../shared/services/order-history.service';
import { SharedDataService } from '../shared/services/shared-data.service';
import { ListofProductsAndQuantityList, ProductAndQuantityList } from '../shared/models/productAndQuantityList';
import { productsList } from '../shared/models/prodcuts';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  userId!: string;
  products!: productsList
  productAndQuantity!: ProductAndQuantityList[];
  showOrderedProducts!: ShowOrderedItems[];

  constructor(private orderService: OrderHistoryService, private sharedDataServices: SharedDataService, private productServices: ProductsService) {
    this.userId = this.sharedDataServices.getUserResponse().userId;
  }

  ngOnInit(): void {
    this.getAllProductsAndQuantityList();
  }
  getAllProductsAndQuantityList() {
    this.orderService.getAllProductsAndQuantitiesList(this.userId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.productAndQuantity = resp;

        this.getAllProductsOrdered(resp.reverse());
      },
      error: (err) => {
        console.log('not correct', err);
      }
    })
  }

  getAllProductsOrdered(productsAndQuantityList: Array<ProductAndQuantityList>) {
    console.log('Here Here: ', productsAndQuantityList);


    productsAndQuantityList.forEach(e => {

      this.productServices.getProductById(e.productId).subscribe({
        next: (resp) => {
          const x = {
            productTitle: resp.data.title,
            productImageUrl: resp.data.imageUrl,
            productQuantity: e.orderedProductQuantity
          }
          if(!this.showOrderedProducts)
          this.showOrderedProducts=[x];
          else 
          this.showOrderedProducts.push(x);
        }
      })
    })


  }
}

interface ShowOrderedItems {
  productTitle: string;
  productImageUrl: string;
  productQuantity: number;
}


interface ShowOrderedItemsWithDate{
  date:string;
  data:Array<ShowOrderedItems>;
}
