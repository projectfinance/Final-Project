import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Otp } from '../models/otp';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class OtpService //This is the one who talks between server (Web API) and client using HttpClient
{
  readonly Url = "https://localhost:44381/";
  constructor(private http: HttpClient) {

  }

  postOTP(phone_num: number) {
    let data = {
      phone: phone_num.toString()
    };

    return this.http.post(this.Url+"api/forgotpassword", JSON.stringify(data), httpOptions);
  }

  getOTP() {
    return this.http.get(this.Url+"getotpsession");
  }

}