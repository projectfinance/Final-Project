import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login=false;

  constructor() { }

  ngDoCheck(){
    if(sessionStorage.getItem('user')){
      this.login=true
    }
    else{
      this.login=false
    }
  }

  ngOnInit(): void {
  }

}
