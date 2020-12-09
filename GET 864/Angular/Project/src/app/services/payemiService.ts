import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class PayEmiService //This is the one who talks between server (Web API) and client using HttpClient
{
    readonly Url = "https://localhost:44381/";
    constructor(private http : HttpClient){

    }

    getPurchaseDetails(name:string){
      return this.http.get(this.Url+"getpurchaserecords/"+name);
    }

    postPayEmi(purchase_id:number){
      let data = {
        pur_id : purchase_id.toString()
      };

    return this.http.post(this.Url+"payemi",JSON.stringify(data),httpOptions);   
    }

}