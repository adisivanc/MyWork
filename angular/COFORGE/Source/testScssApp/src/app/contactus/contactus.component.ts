import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  public dddGhj = false;
  
  arrPlan = ["Earth","Mercury","Venus","Jupiter","Saturn","Neptune"];
  
  objList = {
	  firstName:"Aadhi",
	  lastName:"Sivan"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
