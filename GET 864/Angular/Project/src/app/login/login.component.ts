import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {AccountLoginService} from '../services/account-login.service';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginAccountGroup:FormGroup
  constructor(private service:AccountLoginService,private router:Router) {
    this.LoginAccountGroup=new FormGroup({
      usrname:new FormControl('',[Validators.required,Validators.minLength(6)]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
   }
   get username(){
    return this.LoginAccountGroup.get("usrname");
  }
 
  get password(){
    return this.LoginAccountGroup.get("password");
  }
  get h(){
    return this.LoginAccountGroup.controls;
  }

 
   error:any;
   sendDetails(usern:string,password:string)
   {
     debugger
     this.service.login(usern,password).subscribe(
       data=>{
         if(data=="Wrong Password")
         {
           this.error="Wrong Password"
         }
         else if(data=="Invalid User")
         {
           this.error="Invalid User"
         }
         else if(data=="Success")
         {
           sessionStorage.setItem('user',this.username.value)
           //this.error="Success"
           this.router.navigate(['/Dashboard']);
           //this.LoginAccountGroup.reset()
           
           if(usern=="admin@123" && password=="admin@123")
           {
             sessionStorage.setItem('admin','admin@123');
             this.router.navigate(['/Admin',{token:CryptoJS.AES.encrypt("admin@123", "admin@123#").toString()}])
           }
           /*else{
           this.router.navigate(['/DashBoard'])
           }*/
         }
       }
     );
   }
   LoginAccount()
   {
     if(this.LoginAccountGroup.valid)
     {
       this.sendDetails(this.LoginAccountGroup.value.usrname,this.LoginAccountGroup.value.password);
       //this.router.navigate(['/Dashboard']);
     }
     else{
       alert("Login Error!")
     }
   }
  ngOnInit(): void {
  }

}
