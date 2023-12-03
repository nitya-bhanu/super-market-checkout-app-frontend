import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { setUserSchema, userSchema } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  //getting the user details by id
  getUserDetails(userId: string): Observable<userSchema> {
    return this.http.get<userSchema>(`https://checkout-server.up.railway.app/user/${userId}`);
  }

  //getting all the users
  getAllUsers(): Observable<Array<userSchema>> {
    return this.http.get<Array<userSchema>>(`https://checkout-server.up.railway.app/user`);
  }

  //setting the user if some one signs in 
  setUser(user: setUserSchema):Observable<string> {
    return this.http.post<string>(`https://checkout-server.up.railway.app/user`, user);
  }

  //making user the admin 
  setUserAsAdmin(userId: string) {
    return this.http.post(`https://checkout-server.up.railway.app/user/setAsAdmin`, userId);
  }
}
