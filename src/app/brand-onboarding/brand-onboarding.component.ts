import { Component, OnInit } from '@angular/core';
import { BrandDetails } from '../shared/models/brandDetails';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from '../shared/services/brand.service';

@Component({
  selector: 'app-brand-onboarding',
  templateUrl: './brand-onboarding.component.html',
  styleUrls: ['./brand-onboarding.component.scss']
})
export class BrandOnboardingComponent implements OnInit {
  brandOnboardingData!: BrandDetails
  onBoardBrandForm!: FormGroup

  constructor(private formbuilder: FormBuilder, private router: Router, private brandServices: BrandService) { }


  ngOnInit(): void {
    this.onBoardBrandForm = this.formbuilder.group({
      brandName: this.formbuilder.control(''),
      description: this.formbuilder.control(''),
      businessEmailId: this.formbuilder.control(''),
      onlineWebsiteLink: this.formbuilder.control(''),
      productsCategory: this.formbuilder.control(''),
      approvalStatus: this.formbuilder.control(false)
    })
  }

  submitForm() {


    const x={
      brandId:undefined,
      brandName: this.onBoardBrandForm.value['brandName'],
      description: this.onBoardBrandForm.value['description'],
      businessEmailId: this.onBoardBrandForm.value['businessEmailId'],
      onlineWebsiteLink: this.onBoardBrandForm.value['onlineWebsiteLink'],
      productsCategory: [...this.onBoardBrandForm.value['productsCategory'].split(",")],
      approvalStatus: this.onBoardBrandForm.value['approvalStatus']
    }

    console.log(x);


    this.brandServices.postBrandRequest(x).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/home-page'])
      },
      error: (err) => {
        console.log('err Here: ', err);
      }
    })
  }

}
