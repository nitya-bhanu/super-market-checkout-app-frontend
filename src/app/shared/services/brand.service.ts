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
    return this.http.post(`https://email-backend-production.up.railway.app/brand`,brandDetails,{responseType:'text'});
  }

  getBrandRequests():Observable<Array<BrandDetails>>{
    return this.http.get<Array<BrandDetails>>(`https://email-backend-production.up.railway.app/brand`);
  }

  deleteBrandRequests(brandId:string){
    return this.http.delete(`https://email-backend-production.up.railway.app/brand/${brandId}`,{responseType:'text'});
  }
}
