let path = require('path');
let fs = require('fs');

// generate file address
let absPath = function(dir) {
    return path.join(__dirname, '../', dir);
}

// judge the file is exit
let file_exit = function(absPath) {
    return fs.existsSync(absPath);
}

// create new directory
let dir_create = function(absPath, fn) {
    fs.mkdir(absPath, fn);
}

module.exports = {
    absPath,
    file_exit,
    dir_create
}
