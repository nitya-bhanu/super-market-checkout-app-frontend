import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailAllTemplate } from '../shared/models/emailTemplate';
import { EmailService } from '../shared/services/email.service';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-announcements',
  templateUrl: './send-announcements.component.html',
  styleUrls: ['./send-announcements.component.scss']
})
export class SendAnnouncementsComponent implements OnInit{

  announcementForm!:FormGroup;
  emailIdList:Array<string>=[];

  constructor(private formBuilder:FormBuilder, private emailService:EmailService,private userService:UserService, private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<SendAnnouncementsComponent>){}

  ngOnInit(): void {
      this.announcementForm=this.formBuilder.group({
        subject:this.formBuilder.control(''),
        text:this.formBuilder.control('')
      })
      this.getAllusersEmailId();
  }

  getAllusersEmailId(){
    this.userService.getAllUsers().subscribe({
      next:(resp)=>{
        resp.forEach(e=>{
          this.emailIdList.push(e.emailId);
        })
      }
    })
  }

  sendAnnouncement(){
    const x:EmailAllTemplate={
      toEmailAddress:this.emailIdList,
      subjectEmail:this.announcementForm.value['subject'],
      text:this.announcementForm.value['text'],
    }
    this.emailService.sendEmailToAll(x).subscribe({
      next:(resp)=>{
        this._snackBar.open('Announcement Sent', 'OK', { 
          duration: 2000, 
        });
        this.dialogRef.close();
        console.log(resp);
      }
    })
  }

}
