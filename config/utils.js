let path = require("path");
let fs = require("fs");
let mkdirp = require('mkdirp');
const colors = require('colors');

// generate file address
let absPath = function (dir) {
  return path.join(__dirname, "../", dir);
};

// judge the file is exist
let fileExist = function (absPath) {
  return fs.existsSync(absPath);
};

// create new directory,if the directory exist that the function return the string which is 'the directory is exist'
let dirCreate = function (absPath, fn) {
  let directoryIsExist = fileExist(absPath);
  if (directoryIsExist) {
    console.log('要创建的文件目录已经存在'.red);
    return {
      status: 'exist'
    }
  } else {
    mkdirp(absPath, err => {
      if (err) {
        console.log(err.red);
        return {
          status: 'error'
        }
      }
      if (dataType(fn) == 'Function') {
        fn();
      }
    });
    return {
      status: 'success'
    }
  }
};

//judge the data type
let dataType = function (data) {
  let tmpType = Object.prototype.toString.call(data);
  let sliceString = tmpType.slice(1, tmpType.length - 1);
  return sliceString.split(' ').reverse()[0];
};

// get file name and directory name from absolute path
let getFileMsg = function (absPath) {
  let basename = path.basename(absPath);
  let dirname = path.dirname(absPath);
  return {
    filename: basename,
    dirname: dirname
  }
};

// create file on specified path,If the path mean directory,will return error message.If the path whitch is exist file,return a message to tell developer the file is exist.otherwise,create files depend on specifiedPath param.create succes run cb params.by the way,fn must Function type.
let createFile = function (specifiedPath = "", cb) {
  new Promise((resolve, reject) => {
      fs.stat(specifiedPath, (err, stats) => {
        if (err) {
          resolve();
          return false;
        }
        if (stats.isDirectory()) {
          reject({
            msg: '传入的路径不能为目录路径'
          })
        }
        if (stats.isFile()) {
          reject({
            msg: '文件已经存在'
          });
        }
      })
    })
    .then(data => {
      let fileMsgs = getFileMsg(specifiedPath);
      mkdirp(fileMsgs.dirname, err => {
        if (err) {
          console.log('文件创建失败'.red);
          return false;
        }
        fs.writeFile(path.join(fileMsgs.dirname, fileMsgs.filename), {}, (err) => {
          if (err) {
            console.log(err.red);
            return false;
          }
        });
        if (dataType(cb) == 'Function') {
          cb();
        }
      });
    })
    .catch(errObj => {
      console.log(errObj.msg.red)
    })

};

let delFilesCoreModule = function (absPaths, params) {
  let isExist = fileExist(absPaths);
  if (isExist) {
    fs.unlinkSync(absPaths);
    console.log('文件删除成功!'.green);
    if (dataType(params) == 'Object' && params.autoClear == true) {
      let files = fs.readdirSync(getFileMsg(absPaths).dirname);
      if (files.length == 0) {
        fs.rmdir(getFileMsg(absPaths).dirname, (err) => {
          console.log('空文件夹删除'.green);
        });
      }
    }
  }
};

// delete file
let delFiles = function (absPaths, params, fn) {
  switch (dataType(absPaths)) {
    case 'String':
      delFilesCoreModule(absPaths, params);
      break;
    case 'Array':
      absPaths.forEach(path => {
        delFilesCoreModule(path, params);
      });
      break;
  }
};

//store to file
let store2File = function (absPath = "", writeMsg) {
  /*  fs.createWriteStream(

   ) */
};

const global_exclude = [/node_modules/, absPath("build")];

module.exports = {
  absPath,
  fileExist,
  dirCreate,
  global_exclude,
  dataType,
  createFile,
  delFiles,
  store2File,
  getFileMsg
};
