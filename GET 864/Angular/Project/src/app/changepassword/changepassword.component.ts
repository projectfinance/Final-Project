import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService} from '../services/changePasswordService';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  encrypt_key:string = "FLITNIA8N6C4E";
  url_par:string;
  phone:string;

  passwordConfirming(c:AbstractControl):{invalid:boolean}{
    if(c.get('val_pass').value != c.get('val_confirmpass').value){
      return{invalid:true}
    }
  }

  changepswdForm:FormGroup;
  constructor(public router:Router,public route:ActivatedRoute,private chgpswdservice:ChangePasswordService) { 
    this.changepswdForm=new FormGroup({
      val_pass:new FormControl(null,[Validators.required,Validators.minLength(8)]),
      val_confirmpass:new FormControl(null,[Validators.required,,Validators.minLength(8)])
    },this.passwordConfirming);
  }

  sendPassword(password:string){
    this.chgpswdservice.postPassword(this.phone,password).subscribe();
    this.router.navigate(['/Login']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{this.url_par=params['parameter1']});
    this.phone = CryptoJS.AES.decrypt(this.url_par, this.encrypt_key).toString(CryptoJS.enc.Utf8);
  }

}
