import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AccountLoginService {
  header:any;
  readonly Url="https://localhost:44381/";
  adminlogin:boolean;

  constructor(private http:HttpClient) { 
    const headerSettings:{[name: string]:string | string[];}={};
    this.header=new HttpHeaders(headerSettings);
  }
  login(usern:string,password:string)
  {
    debugger
    const httpOptions={headers:new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post(this.Url+"api/login?usrname="+usern+"&password="+password,httpOptions)
  }
}