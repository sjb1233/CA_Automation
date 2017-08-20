//Takes in Priority_Country.csv and produces Priority_Matrix.json

var getFile = require("./common.js").getFileFunction;
var fs = require("fs");

getFile("Priority_Country", function(fileName){
    fs.readFile(fileName, 'utf8', function(err, data){
        var data_clean = data.split("\r\n");
        createJSON(data_clean, function(err){
            if(err) {
                throw err;
            }
            else{
                console.log("Priority_Country JSON created");
            }
        });
    });
})


function createJSON(arr, callback) {
    if (arr == undefined || arr === null) callback("Error with arr: " + arr);
    var obj = {};
    var priorArr = [];
    for (var i = 0; i < arr.length; i++) {
        var line = arr[i].trim();
        if(line == "" && i == arr.length - 1) break;
        else if(line == "") callback("Error with line " + i + ": it's blank");
        else{
            var countryObj = {};
            var committeeArr = [];
            var lineArr = line.split(",");
            countryObj.country = lineArr[0];
            countryObj.positions = parseInt(lineArr[1]);
            for(var j = 2; j < lineArr.length; j++){
                if(lineArr[j].trim().length == 0) break;
                committeeArr.push(lineArr[j].trim());
            }
            countryObj.committees = committeeArr;
            priorArr.push(countryObj);
        }
    }
    obj.priorArr = priorArr;
    fs.writeFile("Input_Parsed/Priority_Country.json", JSON.stringify(obj), 'utf8', function (err) {
        if (err) {
            callback("Error writing Priority_Country file");
        }
        callback();
    });
}