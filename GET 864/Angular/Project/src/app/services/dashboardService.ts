import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class DashboardService{

    username:string=sessionStorage.getItem('user');

    constructor(private http: HttpClient) { }

    readonly Url = "https://localhost:44381/";

    getEmiCard(){
        return this.http.get(this.Url+"EMICard/"+this.username);
    }

    getPurchase(){
        return this.http.get(this.Url+"Purchase");
    }

    getAdmin(){
        return this.http.get(this.Url+"Admin");
    }

    getCard(id:string){
        return this.http.get(this.Url+"Card/"+id);
    }
}