import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Card } from '../models/card'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  readonly Url = "https://localhost:44381/";
  selectedUser: User = {
    Username: '',
    Password: '',
    AccountNumber: '',
    FirstName: '',
    LastName: '',
    Phoneno: '',
    EmailID: '',
    Address: '',
  };
  constructor(private http: HttpClient) { }
  postUser(user: User) {
    debugger
    return this.http.post(this.Url + "api/Users", JSON.stringify(user), httpOptions);
  }
  postCardDetails(card: Card) {
    debugger
    return this.http.post(this.Url + "carddetails", JSON.stringify(card), httpOptions);
  }
}