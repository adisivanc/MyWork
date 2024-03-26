//Basic
let ageLimit:number = 18;
console.log("Age Limit is"+ageLimit);

if(ageLimit<50)
ageLimit+=5;
console.log("New age" + ageLimit);

//Array
const evenNumber:number[]=[2,4,6];
console.log(evenNumber);
//evenNumber[3]="34"; // Error

//Tupules (Type aliases) 
type nestedTuples = [number,string,[boolean,any]];
let student_Details:nestedTuples = [101,"MyHelloName",[true,"459/12,Bangalore"]];
console.log(student_Details);

//Function void if no return
function taxCalc(totalInc:number,year:Date):number{
    let abc = (year.getFullYear()<2022)?totalInc*1.3:totalInc*2;
    return abc;
}
console.log(taxCalc(234444,new Date()));

//enum
enum Size {Small=1,Medium,Large};
let mySize = Size.Medium;
console.log(mySize);

const enum Sizeeee {Small=1,Medium,Large};
let mySizeeee = Sizeeee.Medium;
console.log(mySizeeee);

//Messay Object
let empDetails01:{
    readonly id:number,
    name:string,
    age?:number
    details:(date:Date)=>void
} = {
    id:1020301,
    name:"Adbul Salam",
    details:(date:Date)=>{
        console.log(date);
    }
}

//Type Alises Object
type Employee02 = {
    readonly id:number,
    name:string,
    age?:number,
    details:(date:Date)=>void
}
let empDetails02:Employee02 = {
    id:1020301,
    name:"Adbul Salam",
    details:(date:Date)=>{
        console.log(date);
    }
}

//Union
let unit:number | string = 10;
unit="10kg";

function unitCalculator(unit:number | string):void{
    if(typeof unit === 'number')
        console.log("Number",unit+10);
    else
        console.log("String",parseInt(unit)+10);
}

unitCalculator(24);
unitCalculator('39kg');

//Intersection

type Emply = {
    id:number,
    name:string
}

type PersEmply = {
    mobNum:number,
    dob:string
}

type fullDetails = Emply & PersEmply;

let fullEmpDl:fullDetails = {
    id:12,
    name:"DDD",
    mobNum:9999_9999,
    dob:"dfdd"
}

//Literal

type fixedWeight = 50 | 100;

let unitWeight:fixedWeight = 50;
unitWeight=100;
//Throw an error if unitWeight=150;


// Null vs undefined
function greet(a:number | null | undefined):any{
    return a;
}
greet(null);
greet(undefined);
greet(20);

//Optional Chaining ?.
