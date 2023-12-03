import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../shared/services/review.service';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss']
})
export class PostReviewComponent implements OnInit{

    reviewForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private reviewServices:ReviewService) { }


  ngOnInit(): void {

    //initialising the form builder
    this.reviewForm = this.formbuilder.group({
      reviewDescription: this.formbuilder.control(''),
      reviewCategory: this.formbuilder.control(''),
    })
  }

  //submitting the add prodcuts form 
  submitForm() :void{
    console.log(this.reviewForm);
    const prod = {
      reviewCategory: this.reviewForm.value['reviewCategory'],
      review: this.reviewForm.value['reviewDescription'],
    }
    console.log(prod);
    this.reviewServices.postReview(prod).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
    //navigating back to admin page whiich has all the products listed
    this.router.navigate(['home-page']);
  }
}
