import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor() { }
  
	showTodayDate() {
		let ndate = new Date();
		return ndate;
	}
	
	showCurrency(){
		let ab:number = 123;
		return ab;
	}
}
