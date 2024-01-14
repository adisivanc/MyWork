"use strict";
let ageLimit = 18;
console.log("Age Limit is" + ageLimit);
if (ageLimit < 50)
    ageLimit += 5;
console.log("New age" + ageLimit);
const evenNumber = [2, 4, 6];
console.log(evenNumber);
let student_Details = [101, "MyHelloName", [true, "459/12,Bangalore"]];
console.log(student_Details);
function taxCalc(totalInc, year) {
    let abc = (year.getFullYear() < 2022) ? totalInc * 1.3 : totalInc * 2;
    return abc;
}
console.log(taxCalc(234444, new Date()));
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
;
let mySize = Size.Medium;
console.log(mySize);
;
let mySizeeee = 2;
console.log(mySizeeee);
let empDetails01 = {
    id: 1020301,
    name: "Adbul Salam",
    details: (date) => {
        console.log(date);
    }
};
let empDetails02 = {
    id: 1020301,
    name: "Adbul Salam",
    details: (date) => {
        console.log(date);
    }
};
let unit = 10;
unit = "10kg";
function unitCalculator(unit) {
    if (typeof unit === 'number')
        console.log("Number" + unit + 10);
    else
        console.log("String" + parseInt(unit) + 10);
}
unitCalculator(24);
unitCalculator('39kg');
//# sourceMappingURL=index.js.map