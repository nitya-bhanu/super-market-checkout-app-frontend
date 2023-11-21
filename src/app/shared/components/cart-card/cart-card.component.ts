import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { prodcutsList } from '../../models/cart';
import { prodcutsSchema } from '../../models/prodcuts';
import { Router } from '@angular/router';

interface exportCartData{
  userId:string,
  prodId:string,
  argument:string
}
interface exportCartPreviewData{
  title:string;
  price:number;
  imageUrl:string
}

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {
  @Input() FetchedProducts!: prodcutsList;
  @Input() userId!: string;

  //cart products quantity emitter
  @Output() handleQuant:EventEmitter<exportCartData>=new EventEmitter();
  @Output() handleexportPreviewData:EventEmitter<exportCartPreviewData>=new EventEmitter();
  displayProducts!: prodcutsSchema;

  constructor(private cartService: CartService, private productService: ProductsService,private router:Router) { }
  ngOnInit(): void {
    this.productService.getProductById(this.FetchedProducts.productId).subscribe({
      next: (resp) => {
        this.displayProducts = resp.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  increaseCart(prodId: string) {
    const x={
      userId:this.userId,
      prodId:prodId,
      argument:'add'
    }
    const y={
      title:this.displayProducts.title,
      price:this.displayProducts.price,
      imageUrl:this.displayProducts.imageUrl
    }
    this.handleQuant.emit(x);
    this.handleexportPreviewData.emit(y);
  }
  decreaseCart(prodId: string) {
    const x={
      userId:this.userId,
      prodId:prodId,
      argument:'add'
    }
    const y={
      title:this.displayProducts.title,
      price:this.displayProducts.price,
      imageUrl:this.displayProducts.imageUrl
    }
    this.handleQuant.emit(x);
    this.handleexportPreviewData.emit(y);
  }
  removeFromCart(prodId: string) {
    this.cartService.deleteCartDetails(this.userId,prodId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
