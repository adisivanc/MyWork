var action  = "";
var index  = "";
var srch = document.getElementsByName("srchLogin")[0]
srch.addEventListener("keyup",searchFn);

var tableData = [{
	"id":1,
	"userName":"John",
	"loginId":"John01",
	"dob":"19/08/1994",
	"mobileNo":"9897890780",
	"status":"active",
	"action":""
},{
	"id":2,
	"userName":"Siva",
	"loginId":"Siva01",
	"dob":"25/08/1994",
	"mobileNo":"9999999999",
	"status":"active",
	"action":""
}]; 

function initTable(){
	debugger;
	document.getElementById("userTable").tBodies[0].innerHTML  = "";
	for (var i = 0; i < tableData.length; i++) {
		tableData[i].id  = i+1;
		displayDataToTable(tableData[i],i);
	};
}
function displayDataToTable(obj,index){
	debugger;
	var tableform = document.getElementById("userTable");
	var row = tableform.tBodies[0].insertRow(-1);
	for (var i in obj) {
		var dataCell = document.createElement("TD");
		if(i === "action"){
           dataCell.innerHTML = "<button onclick='fnEditData(this,"+index+")'>Edit</button><button onclick='fnDeleteData(this,"+index+")'>Delete</button>"
		}
		else{
		  dataCell.innerHTML = obj[i];
		}
		row.appendChild(dataCell);
		tableform.tBodies[0].appendChild(row); 	
	}
}
function fnSaveData(){
	debugger;
	var data = {}; 
	data['id'] =1;


	let varUsername = document.getElementsByName('username')[0].value;
	let varloginid = document.getElementsByName('loginid')[0].value;
	let vardob = document.getElementsByName('dob')[0].value;
	let varmobNum = document.getElementsByName('mobNum')[0].value;
	let varactState = document.getElementsByName('actState')[0].value;

	if(varUsername!=="" && varloginid!=="" && vardob!=="" && varmobNum!=="" && varactState!==""){
		data['userName'] = document.getElementsByName('username')[0].value;
		data['loginId'] = document.getElementsByName('loginid')[0].value;
		data['dob'] = document.getElementsByName('dob')[0].value;
		data['mobileNo'] = document.getElementsByName('mobNum')[0].value;
		data['status'] = document.getElementsByName('actState')[0].value;


		data['action'] ="";
		if(action  === "Add"){
		tableData.push(data);
		}
		else{
			tableData[index] =data;
		}
		initTable();
		hideAddRecord();
	}else{
		alert("Please fill the data");
	}
	
	
}
function fnEditData(pThis,i){
	action = "Update";
	index  = i;
    var data = tableData[i];
    document.getElementsByName('username')[0].value = data['userName'];
	document.getElementsByName('loginid')[0].value = data['loginId'];
	document.getElementsByName('dob')[0].value = data['dob'];
	document.getElementsByName('mobNum')[0].value = data['mobileNo'];
	document.getElementsByName('actState')[0].value = data['status'];
	document.getElementsByClassName("popup")[0].classList.remove("hideEle");
}
function fnDeleteData(pThis,i){
	tableData.splice(i,1);
	initTable();
}
function showAddRecord(){
	action = "Add";
	document.getElementsByClassName("popup")[0].classList.remove("hideEle");
}

function hideAddRecord(){
	document.getElementsByName("addForm")[0].reset();
	document.getElementsByClassName("popup")[0].classList.add("hideEle");

}

function addRecord(){
	var listOfData = {}
	alert(document.addForm.username.value);
    //listOfData['username']=document.addForm.username.value;
}

function searchFn(){
	var tableform = document.getElementById("userTable");
	var row = tableform.tBodies[0].insertRow(-1);

	var srcVal = document.getElementsByName("srchLogin")[0].value;

	if(srcVal!=null){
		for (var i in obj) {
			var dataCell = document.createElement("TD");
			if(i === "action"){
			   dataCell.innerHTML = "<button onclick='fnEditData(this,"+index+")'>Edit</button><button onclick='fnDeleteData(this,"+index+")'>Delete</button>"
			}
			else{
			  dataCell.innerHTML = obj[i];
			}
			row.appendChild(dataCell);
			tableform.tBodies[0].appendChild(row); 	
		}
	}else if(srch.value==null){
		document.getElementById("noRes").style.display="none"
		initTable()
	}
	else{
		tableform.style.display="none";
		document.getElementById("noRes").innerHTML="No Search Found"
	}
	
}

initTable();