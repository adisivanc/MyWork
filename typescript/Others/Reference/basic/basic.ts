let message:string = "Typescript";
console.log(message);

var str = '1' 
var str2:number = <any> str   //str is now of type number 
console.log(typeof(str2));


var num = 2;    // data type inferred as  number 
console.log("value of num "+num); 
num = <any> "12";
console.log(num);