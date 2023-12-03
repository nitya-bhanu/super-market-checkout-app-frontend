import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productsList } from '../models/prodcuts';
import { ListofProductsAndQuantityList, ProductAndQuantityList } from '../models/productAndQuantityList';


@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(private http:HttpClient) { }

  getAllOrderedProducts(prodcutsAndQuantityList:ListofProductsAndQuantityList):Observable<productsList>{
    return this.http.post<productsList>(`https://checkout-server.up.railway.app/order-history`,prodcutsAndQuantityList);
  }

  getAllProductsAndQuantitiesList(userId:string):Observable<ProductAndQuantityList[]>{
    return this.http.post<ProductAndQuantityList[]>(`https://checkout-server.up.railway.app/order-history/get-orders-quantity-list`,userId);
  }

}

