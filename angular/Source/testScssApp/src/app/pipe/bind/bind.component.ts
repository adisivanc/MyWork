import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-bind]',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss']
})
export class BindComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  
  //Class Binding
  name="";
  
  txtStatus = "text-success";
  
  hasError=true;
  isSpl=true;
  
  public statusClass = { 
	"text-success":!this.hasError,
	"text-error":this.hasError,
	"text-special":this.isSpl
  }
  

}
