import { Component } from '@angular/core';
import { ServiceoneService } from './serviceone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	title = 'tsproj';
	
	public persondata:any[] = [];
	
	constructor(private serviceone: ServiceoneService) {}
	
	ngOnInit() { 
		this.serviceone.getData().subscribe((data:any) => {
			console.log(data);
			this.persondata = Array.from(Object.keys(data), k=>data[k]);
			console.log(this.persondata);
		});
	}

}
