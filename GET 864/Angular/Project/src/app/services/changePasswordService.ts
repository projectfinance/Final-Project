import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class ChangePasswordService //This is the one who talks between server (Web API) and client using HttpClient
{
  readonly Url = "https://localhost:44381/";
    constructor(private http : HttpClient){}

    postPassword(phone_num:string,pswd:string){
        let data = {
            phone : phone_num.toString(),
            password : pswd.toString()
        };

        return this.http.post(this.Url+"/checkphoneexists",JSON.stringify(data),httpOptions);   
    }

}