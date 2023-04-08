let showAddRecord = function(){
    document.getElementsByClassName("popup")[0].classList.remove("hideEle");
    
}

let hideAddRecord = function(){
    document.getElementsByClassName("popup")[0].classList.add("hideEle");
    
}

let addRecord = function(){
    var listOfRec = []
    var listOfData = {}
    listOfData['username']=document.addForm.username.value;
    listOfData['loginid']=document.addForm.loginid.value;
    listOfData['dob']=document.addForm.dob.value;
    listOfData['mobNum']=document.addForm.mobNum.value;
    listOfData['actState']=document.addForm.actState.value;
    console.log(listOfData);
    listOfRec.push(listOfData);
    console.log(listOfRec);
    document.getElementById("addForm").reset();
}