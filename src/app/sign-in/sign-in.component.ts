import { Component, OnInit } from '@angular/core';
import { SignInUpService } from '../shared/services/sign-in-up.service';
import { UserSignInSchema } from '../shared/models/userSignInResponse';
import { SharedDataService } from '../shared/services/shared-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EnterOtpComponent } from '../enter-otp/enter-otp.component';
import { EmailService } from '../shared/services/email.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;

  constructor(private getSignInUpService: SignInUpService, private sharedDataService: SharedDataService, private router: Router, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public dialog: MatDialog, private emailService: EmailService) { }
  fetchedUserDataResponse!: UserSignInSchema

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      emailID: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    })
  }

  //getting the signed in user details 
  getUserDetails(): void {
    this.getSignInUpService.getUserResponse(this.signInForm.controls['emailID'].value, this.signInForm.controls['password'].value).subscribe({
      next: (resp) => {
        this.fetchedUserDataResponse = resp;

        this.sharedDataService.setUserResponse(resp);

        console.log('Sign in resp:', this.sharedDataService.getUserResponse());
        console.log('I am updated');
        if (this.fetchedUserDataResponse.bool === true && this.fetchedUserDataResponse.role === 'user') {
          this.emailService.sendOtpRequest(this.signInForm.controls['emailID'].value).subscribe({
            next: (resp) => {
              console.log(resp);
              this.sharedDataService.setOtp(resp);
              this.openDialog();
            },
            error:(err)=>{
              console.log(err);
            }
          })
        }
        else if (this.fetchedUserDataResponse.bool === true && this.fetchedUserDataResponse.role === 'admin') {
          this.emailService.sendOtpRequest(this.signInForm.controls['emailID'].value).subscribe({
            next: (resp) => {
              console.log(resp);
              this.sharedDataService.setOtp(resp);
              this.openDialog();
            },
            error:(err)=>{
              console.log(err);
            }
          })
        }
        else {
          this._snackBar.open('Invalid Credentials', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['sign-in'])
        }
      },
      error: (err) => {
        this._snackBar.open('Invalid Credentials', 'OK', {
          duration: 2000,
        });
        console.log('Error fetching password:', err);
      }
    })
  }

  openDialog() {
    this.dialog.open(EnterOtpComponent);
  }
}
