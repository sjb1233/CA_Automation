//Takes in Priority_Country.csv and produces Priority_Matrix.json

var getFile = require("./common.js").getFileFunction;
var fs = require("fs");
var countryMatrix = require("../Input_Parsed/CountryMatrix.json");

getFile("Priority_School", function(fileName){
    fs.readFile(fileName, 'utf8', function(err, data){
        var data_clean = data.split("\r\n");
        createJSON(data_clean, function(err){
            if(err) {
                throw err;
            }
            else{
                console.log("Priority_School JSON created");
            }
        });
    });
})


function createJSON(arr, callback) {
    if (arr == undefined || arr === null) callback("Error with arr: " + arr);
    var obj = {};
    var priorArr = [];
    for (var i = 0; i < arr.length; i++) {
        var c = arr[i].trim();
        if(c == "" && i == arr.length - 1) break;
        else if(c == "") callback("Error with line " + i + ": it's blank");
        else{
            var country = countryMatrix[c];
            if(country === null || country === undefined) callback("Error with line " + i + ": country is undefined - " + arr[i]);
            priorArr.push(c);
        }
    }
    obj.priorArr = priorArr;
    fs.writeFile("Input_Parsed/Priority_School.json", JSON.stringify(obj), 'utf8', function (err) {
        if (err) {
            callback("Error writing Priority_School file");
        }
        callback();
    });
}