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
    return this.http.get<Array<orderSchema>>(`http://localhost:8080/orders`);
  }

  //psoting all the orders placed by user
  postOrder(e:cartSchema,price:number):Observable<orderSchema>{
    return this.http.post<orderSchema>(`http://localhost:8080/orders/${price}`,e);
  }
}
