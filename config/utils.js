let path = require("path");
let fs = require("fs");
let mkdirp = require("mkdirp");
const colors = require("colors");
const jsonfile = require('jsonfile');

// generate file address
let absPath = function(dir) {
    return path.join(__dirname, "../", dir);
};

// judge the file is exist
let fileExist = function(absPath) {
    return fs.existsSync(absPath);
};

// create new directory,if the directory exist that the function return the string which is 'the directory is exist'
let dirCreate = function(absPath, fn) {
    let directoryIsExist = fileExist(absPath);
    if (directoryIsExist) {
        console.log("要创建的文件目录已经存在".red);
        return {
            status: "exist"
        };
    } else {
        mkdirp(absPath, err => {
            if (err) {
                console.log(err.red);
                return {
                    status: "error"
                };
            }
            if (dataType(fn) == "Function") {
                fn();
            }
        });
        return {
            status: "success"
        };
    }
};

//judge the data type
let dataType = function(data) {
    let tmpType = Object.prototype.toString.call(data);
    let sliceString = tmpType.slice(1, tmpType.length - 1);
    return sliceString.split(" ").reverse()[0];
};

// get file name and directory name from absolute path
let getFileMsg = function(absPath) {
    let basename = path.basename(absPath);
    let dirname = path.dirname(absPath);
    return {
        filename: basename,
        dirname: dirname
    };
};

let createFileCoreModule = function(specifiedPath) {
    return new Promise((resolve, reject) => {
            fs.stat(specifiedPath, (err, stats) => {
                if (err) {
                    resolve();
                    return false;
                }
                if (stats.isDirectory()) {
                    reject({
                        msg: "传入的路径不能为目录路径"
                    });
                }
                if (stats.isFile()) {
                    reject({
                        msg: `路径为${specifiedPath}的文件已经存在`
                    });
                }
            });
        })
        .then(data => {
            let fileMsgs = getFileMsg(specifiedPath);
            mkdirp(fileMsgs.dirname, err => {
                if (err) {
                    console.log("文件创建失败".red);
                    return false;
                }
                fs.writeFileSync(
                    path.join(fileMsgs.dirname, fileMsgs.filename), {},
                    err => {
                        if (err) {
                            console.log(err.red);
                            return false;
                        }
                    }
                );
            });
            return {
                status: true,
            }
        })
        .catch(errObj => {
            console.log(errObj.msg.red);
            return {
                status: false,
                info: errObj.msg
            };
        });
};

// create file on specified path,If the path mean directory,will return error message.If the path whitch is exist file,return a message to tell developer the file is exist.otherwise,create files depend on specifiedPath param.create succes run cb params.by the way,fn must Function type.
let createFiles = async function(specifiedPaths, cb) {
    let statistic = 0;
    switch (dataType(specifiedPaths)) {
        case "String":
            await createFileCoreModule(specifiedPaths);
            cb();
            break;
        case "Array":
            let status = specifiedPaths.forEach(async itemPath => {
                await createFileCoreModule(itemPath);
                statistic++;
                if (Object.is(statistic, specifiedPaths.length)) {
                    cb();
                }
            });
            break;
        case "Undefined":
            console.log("创建的路径不能为空!".red);
            break;
    }
};

let delFilesCoreModule = function(absPaths, params, cb) {
    let isExist = fileExist(absPaths);
    if (isExist) {
        fs.unlinkSync(absPaths);
        console.log("文件删除成功!".green);
        if (dataType(params) == "Object" && params.autoClear == true) {
            let files = fs.readdirSync(getFileMsg(absPaths).dirname);
            if (files.length == 0) {
                fs.rmdir(getFileMsg(absPaths).dirname, err => {
                    console.log("空文件夹删除".green);
                });
            }
        }
        cb();
    } else {
        console.log('文件删除路径不存在');
        return false;
    }
};

// delete file
let deleteFiles = function(absPaths, params, cb) {
    switch (dataType(absPaths)) {
        case "String":
            delFilesCoreModule(absPaths, params, cb);
            break;
        case "Array":
            absPaths.forEach(async path => {
                delFilesCoreModule(path, params, cb);
            });
            break;
    }
};

//read message from file
let readFromFile = function(absPath = "", params, cb) {
    if (fileExist(absPath)) {
        let fileMsg = fs.readFileSync(absPath, 'utf8');
        if (Object.is('Object', dataType(params))) {
            switch (params.type) {
                case 'json':

                    jsonfile.readFile(absPath, (err, obj) => {
                        if (err == undefined) {
                            cb(err, obj);
                        }
                    });

                    break;
                default:
                    break;
            }
        } else {
            cb(fileMsg);
        }
    }
};

//store to file,only support message write to single file
// writeMsg not type undefined,null,NaN
let store2File = function(absPath = "", writeMsg, writeParams) {
    let dealStr = "";
    if (Object.is(dataType(writeParams), 'Object') && writeParams.parseType) {
        switch (writeParams.parseType) {
            case 'json':
                jsonfile.writeFile(absPath, writeMsg)
                    .then(res => {
                        console.log(res);
                    })
                break;
            default:
                break;
        }
    } else {
        dealStr = writeMsg.toString();
    }
    /*  switch (dataType(writeMsg)) {
         case "Object":
         case "Array":
             dealStr = JSON.stringify(writeMsg);
             break;
         case 'Function':
             dealStr = writeMsg.toString();
             break;
         default:
             dealStr = writeMsg;
             break;
     } */

    const buf = Buffer.from(dealStr, "utf8");
    if (fileExist(absPath) && !fs.statSync(absPath).isDirectory()) {
        let writeSteam = fs.createWriteStream(absPath);
        writeSteam.write(buf, "utf8");
        writeSteam.end();

        writeSteam.on("finish", () => {
            console.log("文件写入成功".green);
        });

        writeSteam.on("error", () => {
            console.log("文件写入错误".red);
        });
    } else {
        console.log("指定的路径文件不存在".red);
    }
};

const global_exclude = [/node_modules/, absPath("build")];

module.exports = {
    absPath,
    fileExist,
    dirCreate,
    global_exclude,
    dataType,
    createFiles,
    deleteFiles,
    store2File,
    getFileMsg,
    readFromFile
};
