var runId = function(ID){
    var fs = require('fs');

    var dir = "Input_Parsed/" + runId;

    if (!fs.existsSync(dir)){
        return "";
    }
    else return "Yes";
}