import { Component } from '@angular/core';
import { MyserviceService } from './myservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
    
	title = 'serviceApp';
  
	public todaydate:any;
	public currency:any;
	
	constructor(private myservice: MyserviceService) {}
	
	ngOnInit() {
		this.todaydate = this.myservice.showTodayDate();
		console.log(typeof(this.todaydate));
		this.currency = this.myservice.showCurrency();
		console.log(typeof(this.currency));
	}

}
