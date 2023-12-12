import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailAllTemplate, EmailTemplate } from '../models/emailTemplate';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendEmail(emailInfo:EmailTemplate){
    return this.http.post(`https://email-backend-production.up.railway.app/email`,emailInfo,{responseType:'text'});
  }

  sendEmailToAll(emailInfo:EmailAllTemplate){
    return this.http.post(`https://email-backend-production.up.railway.app/email/announcements`,emailInfo,{responseType:'text'});
  }

  sendOtpRequest(emailId:string){
    return this.http.post(`https://email-backend-production.up.railway.app/email/otp`,emailId,{responseType:'text'});
  }

}
