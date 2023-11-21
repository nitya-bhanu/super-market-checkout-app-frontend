import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SharedDataService } from '../../services/shared-data.service';
import { cartSchema } from '../../models/cart';
import { prodcutsSchema } from '../../models/prodcuts';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() FetchedProducts!: prodcutsSchema;
  @Input() checkTag!: string;

  //exporting the click event to trigger functions
  @Output() cartTrigger:EventEmitter<number>=new EventEmitter();

  cartDetails: cartSchema = {
    userId: '',
    productAndQuantityList: []
  };

  constructor(private cartService: CartService, private sharedDataService: SharedDataService) { }

  uId: string = this.sharedDataService.getUserResponse().userId;



  //adding to cart 
  addToCart(prodId: string): void {

    const x=document.getElementById(prodId);
    x!.innerText='Added';

    this.cartService.getTotalcartLength(this.uId).subscribe({
      next:(resp)=>{
        this.cartTrigger.emit(resp);
      }
    })

    this.cartDetails = {
      userId: this.uId,
      productAndQuantityList: [
        {
          productId: prodId,
          orderedProductQuantity: 1
        }
      ]
    }

    //posting the cart into cart collections of a particular user
    this.cartService.postCartDetails(this.cartDetails).subscribe({
      next: (res) => {
        if (res.success=== false) {
          alert("grindddd");
        }
        console.log(res);
      }
    })
  }
}

