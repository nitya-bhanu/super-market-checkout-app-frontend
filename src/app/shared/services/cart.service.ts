import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartSchema } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  getCartDetails(userId:string):Observable<any>{
    return this.http.get(`http://localhost:8080/cart?userId=${userId}`);
  }

  postCartDetails(cartSchema:cartSchema):Observable<any>{
    console.log(cartSchema);
    return this.http.post(`http://localhost:8080/cart`,cartSchema);
  }

  putCartDetails(userId:string,productId:string,argument:string):Observable<any>{
    return this.http.put(`http://localhost:8080/cart?userId=${userId}&productId=${productId}&argument=${argument}`,"");
  }

  deleteCartDetails(userId:string,productId:string):Observable<any>{
    return this.http.delete(`http://localhost:8080/cart?userId=${userId}&productId=${productId}&argument`);
  }

  deleteWholeCart(userId:string):Observable<any>{
    return this.http.delete(`http://localhost:8080/cart/${userId}`);
  }

  getTotalCartMoney(userId:string):Observable<any>{
    return this.http.get(`http://localhost:8080/cart/cartTotal/${userId}`);
  }

  getTotalcartLength(userId:string):Observable<any>{
    return this.http.get(`http://localhost:8080/cart/cartLength/${userId}`);
  }

}