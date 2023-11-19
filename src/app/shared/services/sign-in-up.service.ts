import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInUpService {
  constructor(private http:HttpClient) { }
  getUserResponse(userId:string, password:string):Observable<any>{
    const x={
      userId:userId,
      password:password
    }
    return this.http.post(`http://localhost:8080/sign-in`,x);
  }
}
