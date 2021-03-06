module.exports = {
    getFileFunction: getFile,
    cleanFunction: clean
}

//str is used to find the file we are interested in
function getFile(str, callback) {
    var fse = require('fs-extra');
    var fs = require('fs');
    //Now, we have an empty directory, we can begin parsing
    fs.readdir("Input", function (err, filenames) {
        if (err) {
            console.log(err);
            callback()
        }
        filenames.forEach(function (filename) {
            if(filename.includes(str)) callback("Input/" + filename);
        });
    })
}

function clean(){
    var fse = require('fs-extra');
    fse.emptyDir("Input_Parsed").then(function (err) {
        if(err) console.log(err);
    });
}