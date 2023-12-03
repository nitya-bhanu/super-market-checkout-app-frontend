import { Component, OnInit } from '@angular/core';
import { Review } from '../shared/models/review';
import { ReviewService } from '../shared/services/review.service';

@Component({
  selector: 'app-get-review',
  templateUrl: './get-review.component.html',
  styleUrls: ['./get-review.component.scss']
})
export class GetReviewComponent implements OnInit{

  reviewLists!:Array<Review>

  constructor(private reviewServices:ReviewService){}

  ngOnInit(): void {
      this.getAllReviews();
  }

  getAllReviews(){
    this.reviewServices.getAllReviews().subscribe({
      next:(resp)=>{
        this.reviewLists=resp;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
