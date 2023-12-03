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
  getAllLoyaltyPoints():Observable<Array<LoyaltyScehma>>{
    return this.http.get<Array<LoyaltyScehma>>(`https://checkout-server.up.railway.app/loyalty`);
  }

  //updating loyalty points against several levels of loyalty
  updateLoyaltyPoints(e:LoyaltyScehma):Observable<null>{
    return this.http.post<null>(`https://checkout-server.up.railway.app/loyalty`,e);
  }

  //getting the loyalty discount on the basis of loyalty points of certain user
  getLoyaltyWiseDiscountValue(e:number):Observable<number>{
    return this.http.get<number>(`https://checkout-server.up.railway.app/loyalty/${e}`);
  }

}
