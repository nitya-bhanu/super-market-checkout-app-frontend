import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoyaltyScehma } from '../models/loyalty';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  constructor(private http:HttpClient) { }

  getAllLoyaltyPoints():Observable<any>{
    return this.http.get(`http://localhost:8080/loyalty`);
  }

  updateLoyaltyPoints(e:LoyaltyScehma):Observable<any>{
    return this.http.post(`http://localhost:8080/loyalty`,e);
  }

  getLoyaltyWiseDiscountValue(e:number):Observable<any>{
    return this.http.get(`http://localhost:8080/loyalty/${e}`);
  }

}
