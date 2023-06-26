import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss']
})


export class PipeComponent implements OnInit {
	
pageTitle = "Pipeline";

author:string = "SIVA";

todDate = new Date();	

arraY = ["AAA","BBB","CCC","DDD","EEE"];
	
customID:string = "testID";

customID02:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
