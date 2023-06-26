import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  pageTitle:string = "Pipeline Concepts";
  
  notes:string = "Javascript is Case Sensitive"
  
  dateDetails = new Date();
  
  currency = 387.90;
  
  decimalVal = 3.14159;
  
  month = ["Jan", "Feb", "Mar", "April", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  percentVal = 0.7856;
  
  sliceVal = "Javascript is Case Sensitive";
  
  objVal = { fname:"Aadhi", lname:"Sivan", email:"adisiva@gmaxx.co",dob:"29/03/1904" }
  

}
