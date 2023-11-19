import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }
  getAllOrders():Observable<any>{
    return this.http.get(`http://localhost:8080/orders`);
  }
  postOrder(e:any,price:number):Observable<any>{
    return this.http.post(`http://localhost:8080/orders/${price}`,e);
  }
}
