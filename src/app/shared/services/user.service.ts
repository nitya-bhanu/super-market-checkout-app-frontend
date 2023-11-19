import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userSchema } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  getUserDetails(userId:string):Observable<any>{
    return this.http.get(`http://localhost:8080/user/${userId}`);
  }

  getAllUsers():Observable<any>{
    return this.http.get(`http://localhost:8080/user`);
  }

  setUser(user:userSchema){
    return this.http.post(`http://localhost:8080/user`,user);
  }

  setUserAsAdmin(userId:string){
    return this.http.post(`http://localhost:8080/user/setAsAdmin`,userId);
  }
}
