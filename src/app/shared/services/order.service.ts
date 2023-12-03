import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderSchema } from '../models/orders';
import { cartSchema } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }

  //getting all the orders in database
  getAllOrders():Observable<Array<orderSchema>>{
    return this.http.get<Array<orderSchema>>(`https://checkout-server.up.railway.app/orders`);
  }

  //psoting all the orders placed by user
  postOrder(e:cartSchema,price:number):Observable<orderSchema>{
    return this.http.post<orderSchema>(`https://checkout-server.up.railway.app/orders/${price}`,e);
  }
}
