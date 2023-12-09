import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailAllTemplate, EmailTemplate } from '../models/emailTemplate';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendEmail(emailInfo:EmailTemplate){
    return this.http.post(`http://localhost:8080/email`,emailInfo,{responseType:'text'});
  }

  sendEmailToAll(emailInfo:EmailAllTemplate){
    return this.http.post(`http://localhost:8080/email/announcements`,emailInfo,{responseType:'text'});
  }

}
