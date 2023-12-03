import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInUpService } from '../shared/services/sign-in-up.service';
import { Route, Router } from '@angular/router';
import { setUserSchema } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signUpForm!:FormGroup;
  constructor(private userServices:UserService,private router:Router,private formBuilder:FormBuilder){}

  ngOnInit(): void {
      this.signUpForm=this.formBuilder.group({
        fullName:this.formBuilder.control(''),
        email:this.formBuilder.control(''),
        phone:this.formBuilder.control(''),
        password:this.formBuilder.control('')
      })
  }

  setUserDetails():void{
    const setUserSchema:setUserSchema={
      name:this.signUpForm.controls['fullName'].value,
      emailId:this.signUpForm.controls['email'].value,
      phoneNumber:this.signUpForm.controls['phone'].value,
      password:this.signUpForm.controls['password'].value,
      loyaltyBalance:0,
      role:'user'
    }
    this.userServices.setUser(setUserSchema).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.router.navigate(['']);
      },
      error:(err)=>{
        console.log('some error here: ');
        console.log(err);
        this.router.navigate(['']);
      }
    })
  }

}
