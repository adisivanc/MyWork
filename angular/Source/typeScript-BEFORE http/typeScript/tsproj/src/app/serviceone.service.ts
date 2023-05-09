import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceoneService {

  constructor() { }

}

console.log("-----------ES6 VARIABLES-----------------");

let total;
total = 10;
console.log(total);
total = true;
console.log(total);

let avg = 50;
console.log(avg);
console.log("Error if we assign avg=true \'ONCE\'");

let randVal:any = 10;
randVal = true;
randVal = "Siva";

let myVar01:string = "lion-Tiger"; // String now
let myVar02:string = myVar01.toUpperCase();
console.log(myVar02);


console.log("-----------ENUM-----------------");

enum Color001 { Red, Green, Blue};
let c001:Color001 =Color001.Green;
console.log(c001);

enum Color002 { Red=28, Green, Blue};
let c002:Color002 =Color002.Blue;
console.log(c002);


console.log("-----------BASIC ARRAY-----------------");

let wArr001:[number,string,string]=[832567,"Aadhi","Sivan"]
console.log(wArr001);


console.log("-----------CLASS-----------------");

class Birds{
	sound:number = 25101990;

	activity():number|string { 
		return this.sound;
	}
}

let kiwi = new Birds();
let ab = kiwi.activity();
console.log(ab);





console.log("----------REST with ARRAY----------");

function abcde(...numb:number[]){
	let i:number=0;
	let j:number=0;
	
	for(i;i<numb.length;i++){
		console.log(numb[i]);
	}
	
	console.log("----------FOR OF----------");
	
	for(j of numb){
		console.log(j);
	}
}

abcde(12,23,34,45);
console.log("*******Second Function*********");
abcde(12,23,34,45,99,22);


console.log("----------FUNCTION OPTIONAL PARAMETER----------");

function calledFunc(empId:number,empName:string,empMob?:number):void{
	console.log(empName+" has a employee ID "+empId+" Employee Mobile number is optional "+empMob);
}

calledFunc(832567,"Siva",978755);
calledFunc(832567,"Siva");


console.log("----------FUNCTION DEFALUT PARAMETER----------");

function calledFunc02(empId:number,empName:string,empMob:number=90000):void{
	console.log(empName+" has a employee ID "+empId+" Employee Mobile number is optional "+empMob);
}

calledFunc02(832567,"Siva",978755);
calledFunc02(832567,"Siva");

console.log("----------ARROW FUNCTION----------");
console.log("----------LAMBDA EXPRESSION / STATEMENTS----------");

let arrowFunc = (empId:number) => { console.log("Employee ID "+empId); }
arrowFunc(832567);


console.log("----------RECURRSION FUNCTION----------");

let factorial = (num:number):any => { 
	if(num <= 0){
		return 1;
	}else{
		return (num * factorial(num-1));
	}
}
console.log(factorial(6));
console.log(factorial(-6));


console.log("----------SELF INVOKING FUNCTION----------");

(function(){ 
	console.log("Self invoking")
})();

console.log("----------SELF INVOKING ARROW FUNCTION----------");

(() => { 
	console.log("Self invoking")
})();

console.log("----------ARRAY with Union----------");

var alpha:number[]|string[];
alpha=[12,23,34,45];
console.log(alpha);
alpha=["AAA","BBB","CCC"];
console.log(alpha);


console.log("----------ARRAY created as Object----------");

let birds:string[] = new Array("crow","hen","cuckoo","peacock");
console.log(birds[0]);


console.log("----------FILTER----------");

function isBigEnough(element:any, index:number, array:any) { 
   return (element >= 10); 
} 
          
var passed = [12, 5, 8, 130, 44].filter(isBigEnough); 
console.log("Test Value : " + passed );



console.log("----------ARROW FILTER----------");

let isBigEnoughArr = (element:any, index:number, array:any) => { 
   return (element >= 10); 
} 
          
var passedArr:number[] = [132, 65, 98, 10, -44, 9, 45].filter(isBigEnoughArr); 
console.log("Arrow Test Value : " + passedArr );


console.log("----------ARROW MAP----------");
          
var passedArr:number[] = [132, 65, 98, 10, -44, 9, 45].map(num => num*2); 
console.log("Arrow Map Value : " + passedArr );


console.log("----------ARROW MAP----------");
          
var arr01:number[] = [132, 65, 98, 10]; 
var arr02:number[] = [22,77]; 
var arr03:any[] = ["AA","BB"]; 
var arr04:any[] = [55,99]; 
console.log(arr01.concat(arr02));
console.log(arr04.concat(arr03));


console.log("----------TUPLE / STACK LIFO----------");

var tuple01 = []
tuple01[0]="Siva";
tuple01[1]="Aadhi";
tuple01[2]=10
console.log("Kind of Array(Hetrogenous) "+tuple01);
tuple01.push(20);
console.log("Kind of Array(Hetrogenous) "+tuple01);
tuple01.pop();
console.log("Kind of Array(Hetrogenous) "+tuple01);


console.log("----------DESTRUCTURING ARRAY----------");
          
var arr07:number[] = [132, 65, 98, 10];
let [a,b] = arr07;
console.log(a+"=A  and  B="+b);


console.log("----------MAIN TOPIC----------");

console.log("----------INTERFACE----------");
          
interface inName {
	firstName:string;
	lastName:string;
	age:number;
	active:boolean;
	calFun: () =>string;
}

let empObj:inName = {
	firstName:"Adisivan",
	lastName:"Chinnasamy",
	age:31,
	active:true,
	calFun: ():string => { return "Going to Eat"; }
}

console.log(empObj.firstName);
console.log(empObj.calFun);
console.log(empObj.calFun());


console.log("----------INTERFACE & UNION----------");
          
interface intUnionFunc {
	firstName:string;
	age:number;
	calFun: string | string[] | (() => string);
}

let empObjj:intUnionFunc = {
	firstName:"Adisivan C",
	age:31,
	calFun:"asAString"
};

console.log(empObjj.calFun);


let empObjjkl:intUnionFunc = {
	firstName:"Adisivan C",
	age:31,
	calFun: () => { return "Going to Sleep"; }
};

let xyz:any = empObjjkl.calFun;
console.log(xyz());

let empObjPjk:intUnionFunc = {
	firstName:"Adisivan C",
	age:31,
	calFun:["Hello","World"]
};

let arrList:any = empObjPjk.calFun;
console.log(arrList[0]+" "+arrList[1]);




























console.log("----------END----------");