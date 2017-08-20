var countryArr = require("../Input_Parsed/Priority_Country.json").priorArr;
var schoolArr = require("../Input_Parsed/Priority_School.json").priorArr;
var countryMatrix = require("../Input_Parsed/CountryMatrix.json");

var range = require("../env.json").range;


function checkEnoughPositions(){
    var positionCount = 0;
    var delegateCount = 0;

    for(var i = 0; i < countryArr.length;i++){
        positionCount += countryArr[i].positions;
    }
    for(var i = 0; i < schoolArr.length;i++){
        delegateCount += countryMatrix[schoolArr[i]].Number_of_Delegates;
    }

    console.log(positionCount);
    console.log(delegateCount);

}

checkEnoughPositions();