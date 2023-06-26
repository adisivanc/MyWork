import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public author = "Siva";

	months = ["January", "February", "March", "April", "May","June", "July", "August", "September","October", "November", "December"];
		
	mobileLayout = false;
	webLayout = true;
	tabletLayout = false;
	
	dummyVar = true;


	myFunc=(event:any)=> {
		//alert("Button");
		this.dummyVar=!this.dummyVar;
		console.log(this.dummyVar);
		console.log(event);
	}
	
	selFun=(event:any)=>{
		alert(event.target.value);
		console.log(event);
	}
		
	constructor() { }

	ngOnInit(): void {
	
	} 

}


  
  


