//This takes in Input/RegistrationForm and produces CountryMatrix.json

var getFile = require("./common.js").getFileFunction;

getFile("RegistrationForm", function (jsonFile) {
    if (jsonFile === undefined || jsonFile === null) console.log("An error occured");
    else {
        console.log("Starting to create JSON objects");
        require("fs").readFile(jsonFile, 'utf8', function(err, data){
            if(err) throw err;
            var objArr = JSON.parse(data);
            createJSON(objArr, function (output) {
                if (output) console.log(output)
            });
        })
    }
});

function createJSON(objArr, callback) {
    if (objArr == undefined || objArr === null) callback("objArr is undefined or null")
    var obj = {};
    for (var i = 0; i < objArr.length; i++) {
        obj[objArr[i].Name_of_School] = {
            Number_of_Delegates: objArr[i].Number_of_Delegates,
            GA: getArray(objArr[i].General_Assemblies_and_ECOSOC),
            SA: getArray(objArr[i].Specialized_Agencies),
            CRI: getArray(objArr[i].Crises)
        }
    }
    var fs = require('fs');
    fs.writeFile("Input_Parsed/CountryMatrix.json", JSON.stringify(obj), 'utf8', function (err) {
        if (err) {
            callback("Error writing CountryMatrix file");
        }

        callback("Finished creating file");
    });
}

function getArray(prefString) {
    var result = [];
    var prefArr = prefString.split(",");
    for (var i = 0; i < prefArr.length; i++) {
        var replaceString = prefArr[i].replace("u", "").replace("[", "").replace("]", "").replace('\\', "");
        replaceString = replaceString.trim();
        if (replaceString.charAt(0) === '\'' && replaceString.charAt(replaceString.length - 1) === '\'') {
            replaceString = replaceString.substring(1, replaceString.length - 1);
        }
        result[i] = replaceString;
    }

    return result;
}

