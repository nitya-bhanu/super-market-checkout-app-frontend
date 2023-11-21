import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetProductsSchemaData, GetSingleProductsSchemaData, prodcutsSchema } from '../models/prodcuts';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  //getting all the products with page size and several filters criteria
  getProducts(pageIndex: number, pageSize: number, sortDirection: string, criteriaName: string, categoryName: string, searchQuery: string): Observable<GetProductsSchemaData> {
    if (categoryName === '' && searchQuery === '')
      return this.http.get<GetProductsSchemaData>(`http://localhost:8080/product?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDirection=${sortDirection}&criteriaName=${criteriaName}&searchQuery&categoryName`);

    else if (categoryName === '')
      return this.http.get<GetProductsSchemaData>(`http://localhost:8080/product?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDirection=${sortDirection}&criteriaName=${criteriaName}&searchQuery=${searchQuery}&categoryName`);

    else if (searchQuery === '')
      return this.http.get<GetProductsSchemaData>(`http://localhost:8080/product?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDirection=${sortDirection}&criteriaName=${criteriaName}&searchQuery&categoryName=${categoryName}`);

    else
      return this.http.get<GetProductsSchemaData>(`http://localhost:8080/product?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDirection=${sortDirection}&criteriaName=${criteriaName}&searchQuery=&categoryName`);
  }

  //getting the products by Id 
  getProductById(productId:string):Observable<GetSingleProductsSchemaData>{
    return this.http.get<GetSingleProductsSchemaData>(`http://localhost:8080/product/${productId}`);
  }

  //updating the products 
  updateProducts(productId:string,product:prodcutsSchema):Observable<resultProducts>{
    return this.http.put<resultProducts>(`http://localhost:8080/product/${productId}`,product);
  }

  //deleting the products by id 
  deleteProductById(productId:string):Observable<resultProducts>{
    return this.http.delete<resultProducts>(`http://localhost:8080/product/${productId}`);
  }

  //adding products to db if admin wants to
  addProducts(product:prodcutsSchema):Observable<resultProducts>{
    return this.http.post<resultProducts>(`http://localhost:8080/product`,product);
  }
}

interface resultProducts{
  success:boolean;
}