//duplicate value and remove dupliacte

const myArr = [11,22,33,22,33,77,33,44,55,66]
let duplicate =[];

let withoutDup = myArr.reduce((acc,val,index)=>{
	if(acc.indexOf(val) === -1){
		acc.push(val);
	}
	else{
		if(duplicate.indexOf(val) === -1){
			duplicate.push(val);
		}
	}
	return [...acc];
},[])

//sort array

let sortedArr = withoutDup.sort((a,b)=>{
	return b-a;
})

let largestNumber = sortedArr[0];

//add array of values with recursive

function addRecursive(arr){
	debugger;
	if(arr.length === 0){
		return 0;
	}
	else if(arr.length === 1){
		return arr[0];
	}
	var temp = arr[0] + arr[1];
	arr.splice(0,2,temp);
	return addRecursive(arr)
}


//Third Question solution

const employees = [{
	"name": "Pooja",
	"yrsOfExperience": "2",
	"city": "Mumbai"
}, {
	"name": "Anuj",
	"yrsOfExperience": "10",
	"city": "Pune"
}, {
	"name": "Sam",
	"yrsOfExperience": "6",
	"city": "Bangalore"
}];

// employees array sort by yrsOfExperience
employees.sort((a,b)=>{
	debugger;
	return parseInt(a.yrsOfExperience)-parseInt(b.yrsOfExperience);
})

// employees array filter 
let puneEmployees = employees.find((obj)=>{
	return obj.city==="Pune";
})

// employees array of obj add new key "grade" with value 5 if yrsOfExperience is greaterthan or eqaual to 5  
let gradeEmployees = employees.map((obj)=>{
	if(parseInt(obj.yrsOfExperience) >= 5){
		obj["grade"] = "5";
	}
	return obj; 
})

//destructing variable declaration
const json = { employees: { name: 'abc', city: 'xyz', contact: { email: 'abc@test.com', number: '123'}}}

let {employees:{contact:{email}}} = json;

//First letter capital in Array of Element
let names=["LEONARDO", "Michelangelo", "Raphael", "donatello", "HAri", "SANDIP"];
let properNameFmt = names.map(val=>{
	debugger;
	var firstLetter = val.charAt(0).toUpperCase();
	var properName = firstLetter + val.slice(1).toLowerCase();
	return properName;
})

//sort by length
let namesy = ["Leonardo", "Michelangelo", "Raphael", "Donatello", "HAri", "sandip"];

namesy.sort((a,b)=>{
	debugger;
	return a.length-b.length;
})

//find Occurance
let boolean = [true,true,false,true,false,true,false,false,true,true]
let booleanOccur = myArr.reduce((acc,val,index)=>{
	if(acc[val]){
		acc[val] = acc[val]+1;
	}
	else{
		acc[val] = 1;
	}
	return {...acc};
},{})


    //binary string count
    var str = str.split("");
    var consectiveOne = 0;
    var consectiveZeros = 0;
    var result = 0;
    for(var i =0; i< str.length;i++){
    	if(str[i]==="0"){
    		if(i-1>=0 && str[i-1]== "1"){
    			consectiveZeros = 0;
    		}
    		consectiveZeros++
    		if(consectiveZeros<=consectiveOne){
    			result++;
    		}
    	}
    	else{
    		if(i-1>=0 && str[i-1]== "0"){
    			consectiveOne = 0;
    		}
    		consectiveOne++
    		if(consectiveOne<=consectiveZeros){
    			result++;
    		}
    	}
    }
    return result;

    //milling machine
    // q- tool name, k - startIndex
    var qFirsttIndex = tools.indexOf(q);
    var qLasttIndex = tools.lastIndexOf(q);
    var leftIndex = k+(tools.length- qLasttIndex),rightIndex = qFirsttIndex-k;
    if(qFirsttIndex < k){
    	if(qFirsttIndex === qLasttIndex){
    		rightIndex = (tools.length - qLasttIndex)+k;
    	}
    	else{
    		rightIndex = qLasttIndex - k;
    	}
    	leftIndex = k-qFirsttIndex;
    }
    else if(qFirsttIndex > k){
    	leftIndex = (tools.length - qLasttIndex)+k
    	rightIndex = qFirsttIndex-k;
    }
    return Math.min(leftIndex,rightIndex);
    
    //first unique character from string
    var strArr = s.split("");
    var result;
    for(var i=0;i<strArr.length;i++){
    	var firstIndex =strArr.indexOf(strArr[0]);
    	var lastIndex = strArr.lastIndexOf(strArr[0]);
    	if(firstIndex==lastIndex){
    		result = i+1;
    		break;
    	}
    	else{
    		if(i==(strArr.length-1)){
    			result = -1; 
    		}
    	}
    }
    return result;

//Copying Array
// Older way
var clonedArray= oldArray.slice(0)    

// ES6 way: spread operator
var clonedArrayES6= [...oldArray] 


function myFunction(employee){
    if(employee.city==="Pune"){
        return employee;
    }
}

const employees99 = [{
	"name": "Pooja",
	"yrsOfExperience": "2",
	"city": "Mumbai"
}, {
	"name": "Anuj",
	"yrsOfExperience": "10",
	"city": "Pune"
}, {
	"name": "Sam",
	"yrsOfExperience": "6",
	"city": "Bangalore"
},{
	"name": "Pooja",
	"yrsOfExperience": "2",
	"city": "Mumbai"
}, {
	"name": "Anuj",
	"yrsOfExperience": "10",
	"city": "Pune"
}, {
	"name": "Sam",
	"yrsOfExperience": "6",
	"city": "Bangalore"
}];

var newArr99 = employees99.filter(myFunction) 
console.log(newArr99);






