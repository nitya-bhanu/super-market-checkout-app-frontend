import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoyaltyScehma } from '../models/loyalty';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  constructor(private http:HttpClient) { }

  //getting all the loyalty points database points
  getAllLoyaltyPoints():Observable<any>{
    return this.http.get(`http://localhost:8080/loyalty`);
  }

  //updating loyalty points against several levels of loyalty
  updateLoyaltyPoints(e:LoyaltyScehma):Observable<any>{
    return this.http.post(`http://localhost:8080/loyalty`,e);
  }

  //getting the loyalty discount on the basis of loyalty points of certain user
  getLoyaltyWiseDiscountValue(e:number):Observable<any>{
    return this.http.get(`http://localhost:8080/loyalty/${e}`);
  }

}
