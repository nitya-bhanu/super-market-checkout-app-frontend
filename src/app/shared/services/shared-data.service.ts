import { Injectable } from '@angular/core';
import { orderSchema } from '../models/orders';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  orderData: orderReceiptSchema = {
    userName: '',
    userEmailId: '',
    userPhoneNumber: '',
    userLoyaltyBalance: 0,
    totalCartMoney: 0,
    productAndQuantityList: []
  };


  userResponse!: UserResponse


  //posting up the order data
  setOrderData(e: orderReceiptSchema):void {
    this.orderData = e;
    localStorage.setItem('orderData',JSON.stringify(this.orderData));
  }

  //setting the user response 
  setUserResponse(e: UserResponse):void {
    this.userResponse = e;
    localStorage.setItem('userResponse',JSON.stringify(this.userResponse));
  }

  //getting the order data from local storage 
  getOrderData():orderSchema {
    return JSON.parse(localStorage.getItem('orderData')!);
  }

  //getting the user details from local storage like logged in users 
  getUserResponse():UserResponse {
    return JSON.parse(localStorage.getItem('userResponse')!);
  }
}

interface productAndQuantitySchema {
  productId: string;
  orderedProductQuantity: number;
}

interface orderReceiptSchema {
  userName: string,
  userEmailId: string,
  userPhoneNumber: string,
  userLoyaltyBalance: number,
  totalCartMoney: number,
  productAndQuantityList: Array<productAndQuantitySchema>
}

interface UserResponse {
  userId: string;
  bool: boolean;
  role: string;
}
