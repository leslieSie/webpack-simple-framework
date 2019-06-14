let path = require("path");
let fs = require("fs");

// generate file address
let absPath = function(dir) {
  return path.join(__dirname, "../", dir);
};

// judge the file is exit
let fileExit = function(absPath) {
  return fs.existsSync(absPath);
};

// create new directory
let dirCreate = function(absPath, fn) {
  fs.mkdir(absPath, fn);
};

//judge the dataType
let dataType = function(data) {};

//create file on absolute path.if the path is not exits,this function can create the file whitch you dictate
let createFile = function(absPath = "", fn) {};

// delete file
let deleteFile = function(absPath = "", params, fn) {};

//store to file
let store2File = function(absPath = "", writeMsg) {};

const global_exclude = [/node_modules/, absPath("build")];

module.exports = {
  absPath,
  fileExit,
  dirCreate,
  global_exclude,
  dataType,
  createFile,
  deleteFile,
  store2File
};
