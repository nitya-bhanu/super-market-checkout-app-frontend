import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartSchema } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }


  //getting the cart details of a particular user
  getCartDetails(userId:string):Observable<any>{
    return this.http.get(`http://localhost:8080/cart?userId=${userId}`);
  }

  //updating and posting the cart data
  postCartDetails(cartSchema:cartSchema):Observable<any>{
    console.log(cartSchema);
    return this.http.post(`http://localhost:8080/cart`,cartSchema);
  }

  //updating the data
  putCartDetails(userId:string,productId:string,argument:string):Observable<any>{
    return this.http.put(`http://localhost:8080/cart?userId=${userId}&productId=${productId}&argument=${argument}`,"");
  }

  //removing the cart item product wise, in short doing the remove item function
  deleteCartDetails(userId:string,productId:string):Observable<any>{
    return this.http.delete(`http://localhost:8080/cart?userId=${userId}&productId=${productId}&argument`);
  }

  //deleting the whole cart, useful in after payment services
  deleteWholeCart(userId:string):Observable<any>{
    return this.http.delete(`http://localhost:8080/cart/${userId}`);
  }

  //getting the total cart products calculated money
  getTotalCartMoney(userId:string):Observable<any>{
    return this.http.get(`http://localhost:8080/cart/cartTotal/${userId}`);
  }

  //getting the cart total money to display in cart icon at home page
  getTotalcartLength(userId:string):Observable<any>{
    return this.http.get(`http://localhost:8080/cart/cartLength/${userId}`);
  }

}