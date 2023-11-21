import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestedProductSchema } from '../models/requestedProduct';

@Injectable({
  providedIn: 'root'
})
export class RequestProductService {

  constructor(private http:HttpClient) { }

  //getting the products which the users have requested
  getRequestedProducts():Observable<any>{
    return this.http.get<RequestedProductSchema>(`http://localhost:8080/product_request`);
  }

  //posting the product requests done by user
  postRequestProducts(product:any):Observable<any>{
    return this.http.post(`http://localhost:8080/product_request`,product);
  }
}
