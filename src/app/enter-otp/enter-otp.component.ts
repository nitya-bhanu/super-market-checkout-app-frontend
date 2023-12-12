import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailService } from '../shared/services/email.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedDataService } from '../shared/services/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {

  otpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private emailService: EmailService, public dialogRef: MatDialogRef<EnterOtpComponent>, private sharedDataServices: SharedDataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      otp: this.formBuilder.control('')
    })
  }

  submitOtp() {
    const otp = this.otpForm.value['otp'];
    if (this.sharedDataServices.getOtp() === otp) {
      this.dialogRef.close();
      this.router.navigate(['home-page']);
    }
    else {
      this.dialogRef.close();
      this._snackBar.open('Oops Wrong Otp, Try again', 'OK', {
        duration: 2000,
      });
      this.router.navigate(['sign-in']);
    }
  }
}
