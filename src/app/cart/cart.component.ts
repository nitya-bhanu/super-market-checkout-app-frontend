import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { prodcutsSchema } from '../shared/models/prodcuts';
import { cartSchema } from '../shared/models/cart';
import { ProductsService } from '../shared/services/products.service';
import { prodcutsList } from '../shared/models/cart';
import { OrderService } from '../shared/services/order.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { userSchema } from '../shared/models/user';
import { SharedDataService } from '../shared/services/shared-data.service';
import { LoyaltyService } from '../shared/services/loyalty.service';
interface exportCartData {
  userId: string,
  prodId: string,
  argument: string
}

declare const Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, AfterViewInit {
  sumTotal = 0;
  productsData!: cartSchema;
  products!: Array<prodcutsList>
  productsDisplayData: prodcutsSchema[] | undefined;
  userDetails!: userSchema;
  userId = '';
  loyaltyBalance = 0;
  isReedemed = false;
  constructor(private cartService: CartService, private productService: ProductsService, private orderService: OrderService, private sharedDataService: SharedDataService, private userService: UserService, private router: Router,private loyaltyService:LoyaltyService) { }

  ngOnInit() {
    console.log('Here: ', this.sharedDataService.getUserResponse());
    this.userId = this.sharedDataService.getUserResponse().userId;
    // console.log('useeeer:', this.userId);
  }


  ngAfterViewInit(): void {
    this.getTotalCartMoney(this.userId);
    this.handleCartDetailSubscriber();
    this.getUserInfo(this.userId);
  }

  //getting the user info which will order the products 
  getUserInfo(userId: string) {
    this.userService.getUserDetails(userId).subscribe({
      next: (resp: userSchema) => {
        this.userDetails = resp;
        this.loyaltyBalance = resp.loyaltyBalance
        // console.log('Lo: ', resp.loyaltyBalance);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //getting sum total of whole cart products price
  getTotalCartMoney(userId: string) {
    this.cartService.getTotalCartMoney(userId).subscribe({
      next: (resp) => {
        this.sumTotal = 0;
        console.log("I got triggered: ", this.sumTotal);
        this.sumTotal = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //handling whatever has been updated or added to the cart
  handleCartDetailSubscriber() {
    this.cartService.getCartDetails(this.userId).subscribe({
      next: (resp) => {
        this.productsData = resp;
        this.products = resp.productAndQuantityList;
        console.log('product to be posted: ', this.productsData);
        console.log(this.products);
        this.getTotalCartMoney(this.userId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //handling the increase and decrease of products
  handleIncDecFunctionality(e: exportCartData) {
    this.cartService.putCartDetails(e.userId, e.prodId, e.argument).subscribe({
      next: (resp) => {
        console.log(resp);
        this.handleCartDetailSubscriber();
        this.getTotalCartMoney(this.userId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //placing the order 
  placeOrder() {
    const keepCartData = {
      userName: this.userDetails.name,
      userEmailId: this.userDetails.emailId,
      userPhoneNumber: this.userDetails.phoneNumber,
      userLoyaltyBalance: this.userDetails.loyaltyBalance,
      totalCartMoney: this.sumTotal,
      productAndQuantityList: this.products
    }

    console.log('Success');


    //declaring the razorpay options object
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: Math.floor(this.sumTotal) * 100,
      name: 'Cart Checkout',
      key: 'rzp_test_A0x90SYHBfArPO',
      order_id: null,
      image: '',
      prefill: {
        name: keepCartData.userName,
        email: keepCartData.userEmailId,
        phone: keepCartData.userPhoneNumber
      },
      theme: {
        color: '#000000'
      },
      handler:()=>{
        this.performReamainingFunctions()
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed')
        }
      }
    }
    Razorpay.open(RozarpayOptions);
  }


  //performing after payout functions like deleting cart data, redirecting to invoice receipt generation
  performReamainingFunctions() {
    const keepCartData = {
      userName: this.userDetails.name,
      userEmailId: this.userDetails.emailId,
      userPhoneNumber: this.userDetails.phoneNumber,
      userLoyaltyBalance: this.userDetails.loyaltyBalance,
      totalCartMoney: this.sumTotal,
      productAndQuantityList: this.products
    }
    this.sharedDataService.setOrderData(keepCartData);
    this.orderService.postOrder(this.productsData, this.sumTotal).subscribe(
      {
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
    this.cartService.deleteWholeCart(this.userId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/order-summary'])
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //changint the total price if someone uses the loyalty points to shop
  changeTotalPrice() {
    this.isReedemed = true;
    this.loyaltyService.getLoyaltyWiseDiscountValue(Math.floor(this.loyaltyBalance)).subscribe({
      next:(resp)=>{
        console.log("Discount Value: ",resp);
        this.sumTotal = this.sumTotal*(resp/100);
      },
      error:(err)=>{
        console.log('Error Finding Discount: ',err);
      }
    })
  }
}