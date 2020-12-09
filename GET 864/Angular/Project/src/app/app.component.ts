import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountLoginService } from './services/account-login.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project'; 
  login = false;
  adminlogin=true;
  user;
  
  constructor(private router:Router, loginService:AccountLoginService){}
 
  ngDoCheck(){
    if(sessionStorage.getItem('user')){
      this.login=true
      this.user=sessionStorage.getItem('user')
    }
    else{
      this.login=false
      this.user=""
    }
    if(sessionStorage.getItem('admin')){
      debugger;
      this.adminlogin=false;
      //this.admin=sessionStorage.getItem('admin') 
    }
    else if(sessionStorage.getItem('user')){
      this.adminlogin=true
    }
    else{
      this.adminlogin=false
    }
  }
 
  logout(){
    sessionStorage.clear()
    this.login=false
    this.user=""
    this.adminlogin=true
    window.location.reload();
    //this.router.navigate(['/Home']);
  }
 
  ngOnInit():void{
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/Home'])
    }
    if(!sessionStorage.getItem('admin')){
      this.router.navigate(['/Home'])
    }
  }
}
