let path = require("path");
let fs = require("fs");
let mkdirp = require('mkdirp');

// generate file address
let absPath = function (dir) {
  return path.join(__dirname, "../", dir);
};

// judge the file is exit
let fileExit = function (absPath) {
  return fs.existsSync(absPath);
};

// create new directory
let dirCreate = function (absPath, fn) {
  mkdirp(absPath, err => {
    if (err) {
      console.log(err.red);
      return false;
    }
    fn();
  });
};

//judge the dataType
let dataType = function (data) {
  let tmpType = Object.prototype.toString.call(data);
  let sliceString = tmpType.slice(1, tmpType.length - 2);
  return sliceString.split(' ').reverse()[0];
};

//create file on absolute path.if the path is not exits,this function can create the file whitch you dictate
let createFile = function (absPath = "", fn) {};

// delete file
let deleteFile = function (absPath = "", params, fn) {};

//store to file
let store2File = function (absPath = "", writeMsg) {
 /*  fs.createWriteStream(

  ) */
};

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
