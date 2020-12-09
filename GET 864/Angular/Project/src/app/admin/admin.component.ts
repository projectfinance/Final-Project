import { Component, OnInit } from '@angular/core';
import { Carddetails } from '../models/carddetails';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { DashboardService } from '../services/dashboardservice';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admindata:any;
  activateid:any;
  cd:Carddetails;
  card:any=[];

  readonly Url = "https://localhost:44381/";

  constructor(private dashService:DashboardService, private http:HttpClient, public route:ActivatedRoute) {}

  ngOnInit(): void {
    if(CryptoJS.AES.decrypt(this.route.snapshot.paramMap.get('token'), "admin@123#").toString(CryptoJS.enc.Utf8) == "admin@123"){
      this.AdminTable();
    }
 
  }

  AdminTable(){
    this.admindata=this.dashService.getAdmin().subscribe(
      (data)=>{this.admindata=data;}
    );
  }

  
  ActivateID(id){
    debugger
    this.activateid=id;
    console.log(this.activateid)
    this.card=this.dashService.getCard(this.activateid.toString()).subscribe(
      (data)=>{this.card=data}
    )
  }

  ActivateYes(){
    debugger;
    this.card["ActivationStatus"]=true;
    this.Activate();
    window.location.reload();
  }

  ActivateNo(){
    this.card["ActivationStatus"]=false;
    this.Activate();
  }

  Activate(){
    return this.http.put(this.Url+"Activate/"+this.activateid.toString(),this.card).subscribe(
      (data)=>{this.cd=data}
    );
  }
  
}
