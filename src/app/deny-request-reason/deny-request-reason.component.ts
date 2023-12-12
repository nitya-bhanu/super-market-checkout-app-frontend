import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../shared/services/email.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrandOnboardingComponent } from '../brand-onboarding/brand-onboarding.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandDetails } from '../shared/models/brandDetails';
import { BrandService } from '../shared/services/brand.service';
import { EmailTemplate } from '../shared/models/emailTemplate';

@Component({
  selector: 'app-deny-request-reason',
  templateUrl: './deny-request-reason.component.html',
  styleUrls: ['./deny-request-reason.component.scss']
})
export class DenyRequestReasonComponent implements OnInit {

  denyReasonForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private emailService: EmailService, public dialogRef1: MatDialogRef<BrandOnboardingComponent>, public dialogRef2: MatDialogRef<DenyRequestReasonComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: BrandDetails, private brandServices: BrandService) { }

  ngOnInit(): void {
    this.denyReasonForm = this.formBuilder.group({
      subject: this.formBuilder.control('Brand Onboarding Request has been denied'),
      reason: this.formBuilder.control('')
    })
  }

  sendMail() {
    console.log(this.denyReasonForm.value['reason']);
    console.log(this.data);

    this.brandServices.deleteBrandRequests(this.data.brandId!).subscribe({
      next: (resp) => {
        console.log(resp);
        const x: EmailTemplate = {
          toEmailAddress: this.data.businessEmailId,
          subjectEmail: this.denyReasonForm.value['subject'],
          text: this.denyReasonForm.value['reason']
        }
        this.emailService.sendEmail(x).subscribe({
          next: (resp) => {
            console.log('Response sent', resp);
            this._snackBar.open('Request Sent successfully', 'OK', {
              duration: 2000,
            });
            this.dialogRef1.close();
            this.dialogRef2.close();
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}