import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignInSchema } from '../models/userSignInResponse';

@Injectable({
  providedIn: 'root'
})
export class SignInUpService {
  constructor(private http:HttpClient) { }
  getUserResponse(userId:string, password:string):Observable<UserSignInSchema>{
    const x={
      userId:userId,
      password:password
    }
    return this.http.post<UserSignInSchema>(`http://localhost:8080/sign-in`,x);
  }
}
