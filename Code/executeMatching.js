var countryArr = require("../Input_Parsed/Priority_Country.json").priorArr;
var countryAssigned = {};

var schoolArr = require("../Input_Parsed/Priority_School.json").priorArr;
var countryMatrix = require("../Input_Parsed/CountryMatrix.json");

var env = require("../env.json");
var fs = require("fs");

var range = env.range;

var whileRetryLimit = env.whileRetryLimit;
var localRangeLimit = env.localRangeLimit;


function checkEnoughPositions() {
    var positionCount = 0;
    var delegateCount = 0;

    for (var i = 0; i < countryArr.length; i++) {
        positionCount += countryArr[i].positions;
    }
    for (var i = 0; i < schoolArr.length; i++) {
        delegateCount += countryMatrix[schoolArr[i]].Number_of_Delegates;
    }

    console.log(positionCount);
    console.log(delegateCount);

    if (positionCount < delegateCount) throw "There aren't enough positions for the delegate count";

}

checkEnoughPositions();

function getCountryRandom(index, localRange, school) {
    try {
        //console.log(school + ": " + countryMatrix[school].Number_Remaining);
        if (localRange > localRangeLimit) return;
        //console.log("localRange " + localRange);
        var lower = index - localRange;
        //console.log("dirty lower " + lower);
        if (lower < 0) lower = 0;
        var upper = index + localRange;
        //console.log("dirty upper " + upper);
        if (lower >= countryArr.length) lower = countryArr.length - 1;
        if (upper >= countryArr.length) upper = countryArr.length - 1;
        var retry = 0;
        while (retry < 3) {
            retry++;
            var random = getRandomNumber(lower, upper);
            //console.log("Upper " + upper);
            //console.log("Lower " + lower);
            //console.log("Random: " + random);
            //console.log("Length " + countryArr.length);
            var countryJSON = countryArr[random]
            //console.log("JSON " + JSON.stringify(countryJSON));
            if (countryJSON.positions > countryMatrix[school].Number_Remaining) continue;
            //else, we are good to return the country; remove the country from the country array
            countryArr.splice(random, 1);
            return countryJSON;
        }
        //if we didn't end up finding a country, recursively call and double the localRange
        if (localRange == 0) return getCountryRandom(index, 1, school);
        return getCountryRandom(index, localRange * 2, school);
    } catch (e) {
        return;
    }
}

function getRandomNumber(lower, upper) {
    var random = Math.random();
    var r = upper - lower;

    var ret = Math.floor((random * r)) + lower;
    return ret;
}

function getDelegateRemaining() {
    var remaining = 0;
    for (var i = 0; i < schoolArr.length; i++) {
        remaining += countryMatrix[schoolArr[i]].Number_Remaining;
    }
    return remaining;
}


function match(getCountry) {
    var cycles = 0;
    var index = 0;
    while (true) {
        console.log("CYCLES " + cycles);
        if (cycles >= whileRetryLimit) break;
        if (getDelegateRemaining() == 0) break;
        var school = schoolArr[index];
        var country = getCountry(index, range, school);
        if (country === undefined || country === null || country === "") {
            index++;
            cycles++;
            if (index >= schoolArr.length) index = 0;
            continue;
        }
        //else, we have a countryJSON returned
        countryAssigned[country.country] = school; //add to the countryAssigned obj
        countryMatrix[school].Countries.push(country.country); //add country to countryMatrix
        countryMatrix[school].Number_Remaining = countryMatrix[school].Number_Remaining - country.positions; //reduce the number remaining
        //NOTE, the country should be removed from the countryArr in the getCountry function
        if (countryMatrix[school].Number_Remaining <= 0) {
            schoolArr.splice(index, 1);
            index--; //since we just removed from the school array, we need the index to stay in place. We'll decrement before the upcoming increment
        }
        index++;
        cycles++;
        if (index >= schoolArr.length) index = 0;
    }

    fs.writeFile("Input_Parsed/CountryAssignment.json", JSON.stringify(countryAssigned), 'utf8', function (err) {
        if (err)
            throw err;

        fs.writeFile("Input_Parsed/FinalizedMatrix.json", JSON.stringify(countryMatrix), 'utf8', function(err){
            if(err) throw err;
            console.log("Write FinalizedMatrix.json");
            return;
        })
    });

}

match(getCountryRandom);


