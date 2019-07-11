const fs = require("fs");
const shell = require("shelljs");
const colors = require("colors");
const RegClient = require("npm-registry-client");
const userMsg = require("./npm-user-login.js");
const {
  readFromFile,
  absPath,
  store2File,
  dataType,
  fileExist,
  getFileMsg,
  replaceAll,
  createFile
} = require("./utils.js");
var client = new RegClient();

// 判断数据是否符合检测类型
let detectCore = function(data) {
  let returnStatus;
  switch (dataType(data)) {
    case "Null":
    case "Undefined":
      returnStatus = false;
      break;

    case "String":
      if (Object.is(data, "")) {
        returnStatus = false;
      } else {
        returnStatus = true;
      }
      break;

    default:
      returnStatus = true;
      break;
  }
  return returnStatus;
};

// 读取最终生成的存储信息
let readstoreMessage = function() {
  let userObj = JSON.parse(JSON.stringify(userMsg));
  if (Object.is(dataType(userObj.storageConfig), "Object")) {
    if (!(userObj.storageConfig.name && userObj.storageConfig.name != "")) {
      userObj.storageConfig.name = "setting.json";
    }
    if (!(userObj.storageConfig.vFiled && userObj.storageConfig.vFiled != "")) {
      userObj.storageConfig.vFiled = "version";
    }
  } else {
    userObj.storageConfig = {
      name: "setting.json",
      vFiled: "version"
    };
  }
  return userObj;
};

function increment() {
  let inc = 0;
  switch (dataType(userMsg.releaseConfig.version)) {
    case "Object":
      inc = userMsg.releaseConfig.version.autoIncrement
        ? parseInt(userMsg.releaseConfig.version.autoIncrement)
        : 1;
      break;
    case "Function":
      inc = userMsg.releaseConfig.version();
      break;
  }
  return inc;
}

function* generator(data) {
  for (let i = 0; i < data.length; i++) {
    yield data[i];
  }
}

// 解析结果运算
let versionComputed = function(version) {
  let splitVersion = version.split(".");
  let iterator = generator(splitVersion);
  let structure = iterator.next().value;
  let feature = iterator.next().value;
  let bug = iterator.next().value;

  switch (userMsg.releaseConfig.type) {
    case "structure":
      structure = parseInt(structure) + increment();
      versionTypeCache.setVersion;
      break;

    case "feature":
      feature = parseInt(feature) + increment();
      break;

    case "bug":
    default:
      bug = parseInt(bug) + increment();
      break;
  }
  return `${structure}.${feature}.${bug}`;
};

// 检测入口
let detectEntry = function() {
  try {
    for (let key in userMsg.loginConfig) {
      let status = detectCore(userMsg.loginConfig[key]);
      if (!status) {
        throw `you may not set up correctly on the file npmUserLogin.js,maybe property userMsg.loginConfig.${key} is empty`;
      }
    }
    for (let key in userMsg.packageConfig) {
      if (Object.is(key, "name") || Object.is(key, "repository")) {
        let status = detectCore(userMsg.packageConfig[key]);
        if (!status) {
          throw `you may not set up correctly on the file npmUserLogin.js,maybe property userMsg.packageConfig.${key} is empty`;
        }
      }
    }
    let versionType = dataType(userMsg.releaseConfig.version);
    if (
      !Object.is(versionType, "Object") &&
      !Object.is(versionType, "Function")
    ) {
      throw `you may not set up correctly on the file npmUserLogin.js,maybe property userMsg.releaseConfig.version type no Function And Object`;
    }
    return true;
  } catch (err) {
    console.log(err.red);
    return false;
  }
};

// 初始化版本号记录文件
let initVersion = function() {
  let storeMessage = readstoreMessage();
  if (!fileExist(absPath(`file_storage/${storeMessage.storageConfig.name}`))) {
    createFile(
      absPath(`file_storage/${storeMessage.storageConfig.name}`),
      store2File(
        absPath(`file_storage/${storeMessage.storageConfig.name}`),
        {
          [storeMessage.storageConfig.vFiled]: ""
        },
        {
          type: "json"
        }
      )
    );
  } else {
    console.log("文件已存在不进行初始化".red);
  }
};

// 计算出默认配置
let computedSetting = function() {
  let storeMessage = readstoreMessage();

  return new Promise((resolve, reject) => {
    let version = "";
    switch (dataType(userMsg.releaseConfig.version)) {
      case "Object":
        if (
          userMsg.releaseConfig.version.hasOwnProperty("static") ||
          Object.is(userMsg.releaseConfig.version.static, "")
        ) {
          version = userMsg.releaseConfig.version.static;
          resolve(version);
        } else {
          readFromFile(
            absPath(`file_storage/${storeMessage.storageConfig.name}`),
            {
              type: "json"
            },
            (err, obj) => {
              let data = JSON.parse(JSON.stringify(obj));
              if (Object.is(data.version, "")) {
                data.version = "0.0.1";
              }
              version = versionComputed(data.version);
              resolve(version);
            }
          );
        }
        break;

      case "Function":
        readFromFile(
          absPath(`file_storage/${storeMessage.storageConfig.name}`),
          {
            type: "json"
          },
          (err, obj) => {
            let data = JSON.parse(JSON.stringify(obj));
            console.log(Object.is(data.version, ""));
            if (Object.is(data.version, "")) {
              version = "0.0.1";
            } else {
              // formatParse
              version = versionComputed(data.version);
            }
            resolve(version);
          }
        );
        break;
    }
  }).then(version => {
    // write to file_storage
    console.log(version);
    store2File(
      absPath(`file_storage/${storeMessage.storageConfig.name}`),
      {
        [storeMessage.storageConfig.vFiled]: version
      },
      {
        type: "json"
      }
    );
  });

  return userMsg;
};

// push to npm
let push2Npm = function() {
  var uri = "https://registry.npmjs.org/npm";
  console.log(userMsg.loginConfig);
  client.get(
    uri,
    {
      username: userMsg.loginConfig.username,
      password: userMsg.loginConfig.password,
      email: userMsg.loginConfig.email
    },
    function(error, data, raw, res) {
      if (error) {
        console.log(error.red);
        return false;
      }
      console.log(res);
      console.log("npm login success".green);
   /*    let code = shell.exec("npm publish").code;
      if (Object.is(code, 0)) {
        console.log("npm publish success".green);
      } */
    }
  );
};

// publilsh peration
let publish = function() {
  let sourceNpmPath = "";
  return new Promise((resolve, reject) => {
    // 检测git是否安装
    shell.exec(
      "git --version",
      {
        silent: true,
        async: true
      },
      (code, stdout, stderr) => {
        if (Object.is(code, 0)) {
          console.log("git already installed".green);
          resolve(true);
        } else {
          console.log(`Error code is ${code},message is ${stderr}`.red);
          return false;
        }
      }
    );
  })
    .then(status => {
      // 设置Npm路径，判断是否使用了淘宝镜像，把淘宝镜像切换回来，等待publish成功之后再将路径重新设置回去
      if (status) {
        let getRegistry = shell.exec("npm config get registry", {
          silent: true
        });
        if (Object.is(getRegistry.code, 0)) {
          sourceNpmPath = replaceAll(getRegistry.stdout, "\n", "");
          return true;
        } else {
          return false;
        }
      }
    })
    .then(status => {
      if (status) {
        shell.exec("npm config set registry https://registry.npmjs.org/", {
          silent: true
        });
        return true;
      }
    })
    .then(status => {
      let toProjectCode = shell.exec("cd ./build").code;
/*       let toBuildCode = shell.exec("cd build").code;
      console.log(toProjectCode);
      console.log(toBuildCode); */
       if (Object.is(toProjectCode, 0) ) {
        /* console.log(
          shell.exec("ls", {
            silent: true
          }).stderr
        ); */
        console.log(`go to build folder success`.green);
        push2Npm();
      } else {
        console.log(`go to folder build error!`.red);
      }
    })
    .catch(errObj => {
      let obj = JSON.parse(errObj);
      console.log(`Error code is ${obj.code}. message is ${obj.stderr}`.red);
    });
};

// main
(function() {
  let isPass = detectEntry(); // 检测必填项已经填写
  if (isPass) {
    initVersion(); // 初始化settings.json文件
    // computedSetting(); // 动态计算settings.json中的版本号
    Promise.all([computedSetting(), publish()]).then(res => {
      console.log("yes this is result");
    });
  }
})();
