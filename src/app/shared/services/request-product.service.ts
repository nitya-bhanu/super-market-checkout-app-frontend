import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestedProductSchema } from '../models/requestedProduct';

@Injectable({
  providedIn: 'root'
})
export class RequestProductService {

  constructor(private http:HttpClient) { }

  getRequestedProducts():Observable<any>{
    return this.http.get<RequestedProductSchema>(`http://localhost:8080/product_request`);
  }

  postRequestProducts(product:any):Observable<any>{
    return this.http.post(`http://localhost:8080/product_request`,product);
  }
}
