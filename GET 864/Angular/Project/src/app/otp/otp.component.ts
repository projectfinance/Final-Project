import { Component, OnInit } from '@angular/core';
import { Otp } from '../models/otp';
import { OtpService} from '../services/otpService';
import * as CryptoJS from 'crypto-js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  session_otp : any;
  session_subscription:any;
  decrypted_otp:any;
  forgotpswdForm:FormGroup;
  otpvalid:boolean = true;
  otpsent:boolean = false;
  phone_stored:number=0;
  encrypt_key:string="FLITNIA8N6C4E";
  user_exists:boolean = true;

  constructor(private otpservice : OtpService, private router:Router) { 
    this.forgotpswdForm=new FormGroup({
      val_phone:new FormControl(null,[Validators.required,Validators.minLength(10)]),
      val_otp:new FormControl(null,[Validators.required,,Validators.minLength(6)])
    });
  }

  sendOTP(phone:number){
    this.otpservice.postOTP(phone).subscribe(()=> this.getOTP());
    this.phone_stored=phone;
    this.otpvalid=true;
    this.otpsent=true;
  }

  getOTP(){
    this.session_subscription = 
    this.otpservice.getOTP()
      .subscribe((data)=> {
          this.session_otp = data;
          console.log(this.session_otp);
          sessionStorage.setItem("OTP",this.session_otp.current_otp);
          if(this.session_otp.current_otp!=0){
          sessionStorage.setItem("EncOTP",CryptoJS.AES.encrypt(this.session_otp.current_otp, this.encrypt_key).toString());
          this.user_exists=true;}
          else
          {sessionStorage.setItem("EncOTP","0");
          this.user_exists=false;};
       });
  }

  verifyOTP(otp:number){
        this.decrypted_otp = CryptoJS.AES.decrypt(sessionStorage.getItem("EncOTP").trim(), this.encrypt_key).toString(CryptoJS.enc.Utf8);
    
        if(otp.toString() == this.decrypted_otp){
          sessionStorage.removeItem("EncOTP")
          this.router.navigate(['/ChangePassword',{parameter1:CryptoJS.AES.encrypt(this.phone_stored, this.encrypt_key).toString()}])
        }
        else{
          sessionStorage.removeItem("EncOTP")
          this.phone_stored=0;
          this.otpvalid = false;
          this.otpsent = false;
        }

  }

  ngOnInit(): void {
    sessionStorage.removeItem("EncOTP")
  }

}
