import { Component, OnInit } from '@angular/core';
import { BrandDetails } from '../shared/models/brandDetails';
import { BrandService } from '../shared/services/brand.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailService } from '../shared/services/email.service';
import { EmailTemplate } from '../shared/models/emailTemplate';

@Component({
  selector: 'app-show-brand-requests',
  templateUrl: './show-brand-requests.component.html',
  styleUrls: ['./show-brand-requests.component.scss']
})
export class ShowBrandRequestsComponent implements OnInit {

  brandRequests!: Array<BrandDetails>
  emailTemplate!: EmailTemplate;
  spinnerLoad = false;

  constructor(private brandServices: BrandService, private emailService: EmailService, public dialogRef: MatDialogRef<ShowBrandRequestsComponent>) { }

  ngOnInit(): void {
    this.getBrandRequestsData();
  }

  getBrandRequestsData() {
    this.brandServices.getBrandRequests().subscribe({
      next: (resp) => {
        this.spinnerLoad = true;
        this.brandRequests = resp;
        console.log(this.brandRequests);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  approveOnboardingRequest(brandReq: BrandDetails) {
    brandReq.approvalStatus = true;
    
    this.brandServices.postBrandRequest(brandReq).subscribe({
      next: (resp) => {
        console.log(resp);
        const x: EmailTemplate = {
          toEmailAddress: brandReq.businessEmailId,
          subjectEmail: "Brand Request Approved",
          text: `Greetings, Your Brand Onboarding Request has been approved. We'll reach out to you soon, meanwhile you can contact us at adminqueries@gmail.com for further queries.`
        }
        this.emailService.sendEmail(x).subscribe({
          next:(resp)=>{
            console.log('Response sent',resp);
          }
        });
      }
    })
  }

  denyBrandRequests(brandReq: BrandDetails) {
    this.brandServices.deleteBrandRequests(brandReq.brandId!).subscribe({
      next: (resp) => {
        console.log(resp);
        const x: EmailTemplate = {
          toEmailAddress: brandReq.businessEmailId,
          subjectEmail: "Brand Request Rejected",
          text: `Greetings, We are sorry to inform you that your Brand Onboarding Request has been rejected. Incase if we need to contact you, We'll reach out to you on your give contact address, meanwhile you can contact us at adminqueries@gmail.com for further queries.`
        }
        
        this.emailService.sendEmail(x).subscribe({
          next:(resp)=>{
            console.log('Response sent',resp);
          }
        });

        this.getBrandRequestsData();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
