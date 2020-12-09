import { Component, OnInit } from '@angular/core';
import { PayEmiService } from '../services/payemiService';
import { Pipe } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Chart } from 'node_modules/chart.js';


@Component({
  selector: 'app-payemi',
  templateUrl: './payemi.component.html',
  styleUrls: ['./payemi.component.css']
})
export class PayemiComponent implements OnInit {

  showModal;
  purchasedetails: any = [];
  totalleft: number = 0;
  p_id: number;
  emi_cost: number;
  username = sessionStorage.getItem('user');
  labellist: any = [];
  data_ylist: any = [];

  constructor(private emiservice: PayEmiService) { }

  fetchPurchaseRecs() {
    this.purchasedetails = this.emiservice.getPurchaseDetails(this.username).subscribe((data) => { this.purchasedetails = data; this.add(this.purchasedetails); this.graph(this.purchasedetails) })
  }

  add(datalist: any) {
    for (let i = 0; i < datalist.length; i++) {
      this.totalleft += datalist[i].EmiLeft;
    }
  }

  postPay() {
    this.emiservice.postPayEmi(this.p_id).subscribe();
    window.location.reload();
  }

  give(purchase_id: number, emi: number) {
    this.p_id = purchase_id;
    this.emi_cost = emi;
  }

  graph(datalist: any) {
    for (let i = 0; i < datalist.length; i++) {
      this.labellist[i] = datalist[i].PurchaseID;
      this.data_ylist[i] = datalist[i].EmiLeft;
    }
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labellist,
        datasets: [{
          label: 'EMI Left per Purchase ID',
          data: this.data_ylist,
          backgroundColor: 'rgba(3,75,112, 0.7)',
          borderColor: 'rgba(0, 51, 102, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{

            ticks: {

              beginAtZero: true

            },

            scaleLabel: {

              display: true,

              labelString: 'EMI Left'

            }

          }],

          xAxes: [{

            scaleLabel: {

              display: true,

              labelString: 'Purchase ID'

            }

          }]
        }
      }
    });

  }

  ngOnInit(): void {
    this.fetchPurchaseRecs();
  }

}
