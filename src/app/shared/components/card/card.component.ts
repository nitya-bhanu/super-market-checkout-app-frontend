import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SharedDataService } from '../../services/shared-data.service';
import { cartSchema } from '../../models/cart';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() FetchedProducts: any;
  @Input() checkTag: any;
  @Output() cartTrigger:EventEmitter<number>=new EventEmitter();

  cartDetails: cartSchema = {
    userId: '',
    productAndQuantityList: []
  };

  constructor(private cartService: CartService, private sharedDataService: SharedDataService) { }

  uId: string = this.sharedDataService.getUserResponse().userId;



  addToCart(prodId: string) {

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
    this.cartService.postCartDetails(this.cartDetails).subscribe({
      next: (res) => {
        if (res.success = false) {
          alert("grindddd");
        }
        console.log(res);
      }
    })
  }
}

export interface DialogData {
  metaInfo:any;
}
