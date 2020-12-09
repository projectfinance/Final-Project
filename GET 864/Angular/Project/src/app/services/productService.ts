import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { PurchaseRecord } from '../models/productpurchase';
import { CardNew } from '../models/cardnew';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ProductService //This is the one who talks between server (Web API) and client using HttpClient
{
  readonly Url="https://localhost:44381/";
  
    constructor(private http : HttpClient){
    }

    username=sessionStorage.getItem('user');

    getProducts(){
      debugger
      return this.http.get(this.Url+"getproducts/"+this.username);
    }


    postPurchaseDetails(record:PurchaseRecord){
      debugger
      return this.http.post(this.Url+"purchaseproduct",JSON.stringify(record),httpOptions); 
    }
    postCardDetails(record:CardNew)
    {
      debugger
      return this.http.post(this.Url+"addcard",JSON.stringify(record),httpOptions);
    }

}