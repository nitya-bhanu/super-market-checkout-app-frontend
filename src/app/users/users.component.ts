import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { userSchema } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  productDisplayData!: Array<userSchema>;

  constructor(private userServices: UserService,private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userServices.getAllUsers().subscribe({
      next: (resp) => {
        console.log('Here Users',resp);
        this.productDisplayData = resp;
      },
      error: (err) => {
        console.log('err');   
        console.log(err);
      }
    })
  }

  setUserAsAdmin(userId:string){
    this.userServices.setUserAsAdmin(userId).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.router.navigate(['/dashboard/users'])
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
