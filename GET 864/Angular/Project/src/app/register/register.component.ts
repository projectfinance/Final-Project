import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Card } from '../models/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessage: string;
  selectUndefinedOptionValue: any;
  cardSelected: string;
  cardlist = [
    { value: "1", name: "Titanium" },
    { value: "2", name: "Gold" },
  ];
  card_rec: Card = new Card();
  cardnumber: number;

  changepswdForm:FormGroup;
  constructor(public userService: UserService, private router:Router) {
   }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    debugger
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.resetForm(form);
      },
    );
    this.card_rec.CardID = "EMI435656";
    
    if ((this.cardSelected)=="1") {
      this.card_rec.CardType = "Titanium"
      console.log(this.card_rec.CardType);
    }
    else this.card_rec.CardType = "Gold"
    this.card_rec.Username = this.userService.selectedUser.Username;
    this.card_rec.EMIPendingStatus = 0;
    this.card_rec.ActivationStatus = 0;
    if (this.card_rec.CardType == "Titanium") {
      debugger
      this.card_rec.Validity = new Date(2021, 12, 31);
      this.card_rec.TotalCredit = 100000;
      this.card_rec.RemainingCredit = 100000;
    }
    else {
      debugger
      this.card_rec.Validity = new Date(2021, 12, 31);
      this.card_rec.TotalCredit = 50000;
      this.card_rec.RemainingCredit = 50000;
    }
    
    this.userService.postCardDetails(this.card_rec).subscribe();
  }



  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      Username: '',
      Password: '',
      AccountNumber: '',
      FirstName: '',
      LastName: '',
      Phoneno: '',
      EmailID: '',
      Address: '',

    };
    form.resetForm();
    this.serverErrorMessage = '';
  }

}
