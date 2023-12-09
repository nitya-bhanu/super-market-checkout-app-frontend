import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandDetails } from '../models/brandDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  postBrandRequest(brandDetails:BrandDetails){
    return this.http.post(`http://localhost:8080/brand`,brandDetails,{responseType:'text'});
  }

  getBrandRequests():Observable<Array<BrandDetails>>{
    return this.http.get<Array<BrandDetails>>(`http://localhost:8080/brand`);
  }

  deleteBrandRequests(brandId:string):Observable<string>{
    return this.http.delete<string>(`http://localhost:8080/brand/${brandId}`);
  }

}
