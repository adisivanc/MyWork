//Number
let a:number = 45;
const mobileNumber:number = 9787_557_799;

//String
const w:string = "Light";

//Boolean
let isLoggedIn = false;

//Any
let weight;
weight=10;
weight="20kg";

//Unknown
const unit = (value:string | number):string => (typeof value === "number")?value+"px":parseInt(value)+"em";
console.log(unit(10));
console.log(unit("20em"));