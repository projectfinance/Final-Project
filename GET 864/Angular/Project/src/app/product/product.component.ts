import { Component, OnInit } from '@angular/core';
import { ProductService} from '../services/productService';
import {Product} from '../models/productDetails';
import { PurchaseRecord } from '../models/productpurchase';
import {UserService} from '../services/user.service';
import { CardNew } from '../models/cardnew';
import {​​Pipe,PipeTransform}​​ from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardService } from '../services/dashboardservice';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  showModal;
  prod : Product = new Product();
  purchase_rec : PurchaseRecord = new PurchaseRecord();
  card_recnew: CardNew=new CardNew();
  productdetails : any = [];
  selectUndefinedOptionValue:any;
  emi_permonth:number=0;
  searchTerm:string;
  card:any=[]

  schemelist=[
    {value:3,name:"3 Months"},
    {value:6,name:"6 Months"},
    {value:9,name:"9 Months"}
  ];

  schemeSelected:number;
  loginsessionuser;
  
  constructor(private prodservice : ProductService,private userService:UserService, private dashService:DashboardService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.EmiCard();

    sessionStorage.setItem('loginstatus','true') //temporary
    this.loginsessionuser = sessionStorage.getItem('loginstatus')
  }
  fetchProducts(){
    debugger
    this.productdetails = this.prodservice.getProducts().subscribe((data)=>
    {this.productdetails = data; console.log(data)}) 
    
  }
  ngDoCheck()
  {
    this.emi_permonth=((this.prod.amt+this.prod.fee)/this.schemeSelected);
  }

  openModal(id:number,name:string,details:string,amt:number,img:string,fee:number){
    this.showModal=true
    
    this.prod.id = id;
    this.prod.name = name;
    this.prod.details = details;
    this.prod.amt = amt;
    this.prod.img = img;
    this.prod.fee = fee;
  }



  purchaseProduct(){
    debugger
    this.purchase_rec.id = this.prod.id;
    this.purchase_rec.amount = this.prod.amt+this.prod.fee;
    this.purchase_rec.scheme = Number(this.schemeSelected);
    this.purchase_rec.username=sessionStorage.getItem('user');
    this.prodservice.postPurchaseDetails(this.purchase_rec).subscribe();
    debugger
    this.card_recnew.Username=sessionStorage.getItem('user');
    this.card_recnew.RemainingCredit=this.purchase_rec.amount;
    this.prodservice.postCardDetails(this.card_recnew).subscribe();
  }

  EmiCard() {
    this.card = this.dashService.getEmiCard().subscribe(
      (data) => { this.card = data, console.log(this.card) }
    );   
  }

}
