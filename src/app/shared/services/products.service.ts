import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetProductsSchemaData, GetSingleProductsSchemaData, prodcutsSchema } from '../models/prodcuts';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

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

  getProductById(productId:string):Observable<GetSingleProductsSchemaData>{
    return this.http.get<GetSingleProductsSchemaData>(`http://localhost:8080/product/${productId}`);
  }

  updateProducts(productId:string,product:prodcutsSchema):Observable<any>{
    return this.http.put(`http://localhost:8080/product/${productId}`,product);
  }

  deleteProductById(productId:string):Observable<any>{
    return this.http.delete(`http://localhost:8080/product/${productId}`);
  }

  addProducts(product:any):Observable<any>{
    return this.http.post(`http://localhost:8080/product`,product);
  }
}
