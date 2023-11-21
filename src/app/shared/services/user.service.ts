import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userSchema } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  //getting the user details by id
  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`http://localhost:8080/user/${userId}`);
  }

  //getting all the users
  getAllUsers(): Observable<any> {
    return this.http.get(`http://localhost:8080/user`);
  }

  //setting the user if some one signs in 
  setUser(user: userSchema) {
    return this.http.post(`http://localhost:8080/user`, user);
  }

  //making user the admin 
  setUserAsAdmin(userId: string) {
    return this.http.post(`http://localhost:8080/user/setAsAdmin`, userId);
  }
}
