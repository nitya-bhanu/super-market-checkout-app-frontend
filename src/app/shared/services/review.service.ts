import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http:HttpClient) { }

  getAllReviews():Observable<Array<Review>>{
    return this.http.get<Array<Review>>(`https://checkout-server.up.railway.app/review`);
  }

  postReview(review:Review):Observable<string>{
    return this.http.post<string>(`https://checkout-server.up.railway.app/review`,review);
  }

}
