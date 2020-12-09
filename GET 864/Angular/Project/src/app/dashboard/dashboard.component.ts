import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboardservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  card: any=[];
  purchase: any=[];
  plength:number;

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {
    this.EmiCard();
  }

  EmiCard() {
    this.card = this.dashService.getEmiCard().subscribe(
      (data) => { this.card = data, console.log(this.card) }
    );   
  }

  PurchaseHistory() {
    debugger;
    this.purchase = this.dashService.getPurchase().subscribe(
      (data) => { this.purchase = data, console.log(this.purchase) }
    );   
  }


}
