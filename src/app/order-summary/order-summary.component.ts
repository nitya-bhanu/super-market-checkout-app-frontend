import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { CartService } from '../shared/services/cart.service';
import { SharedDataService } from '../shared/services/shared-data.service';
import { prodcutsList } from '../shared/models/cart';
import { userSchema } from '../shared/models/user';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})


//generating invoice receipt
export class OrderSummaryComponent implements OnInit {
  productsAndQuantity!: Array<prodcutsList>
  userDetails: userSchema={
    userId: '',
    role: '',
    name: '',
    emailId: '',
    phoneNumber: '',
    loyaltyBalance: 0
  };
  totalSum = 0;
  date = new Date();
  day = this.date.getDate();
  month = this.date.getMonth() + 1;
  year = this.date.getFullYear();

  currentDate = `${this.day}-${this.month}-${this.year}`;
  constructor(private sharedDataService: SharedDataService) {
  }


  ngOnInit(): void {
    this.setSumTotal();
    this.setProductAndQuantity();
    this.setUser();
  }

  setSumTotal() {
    this.totalSum = this.sharedDataService.orderData.totalCartMoney;
  }

  setProductAndQuantity() {
    this.productsAndQuantity = this.sharedDataService.orderData.productAndQuantityList;
  }

  setUser() {
    this.userDetails.emailId = this.sharedDataService.orderData.userEmailId;
    this.userDetails.loyaltyBalance = this.sharedDataService.orderData.userLoyaltyBalance;
    this.userDetails.name = this.sharedDataService.orderData.userName;
    this.userDetails.name = this.sharedDataService.orderData.userName;
  }

  printPage(){
    window.print();
    return false;
  }

}
