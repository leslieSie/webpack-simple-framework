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
  getFileMsg
} = require("./utils.js");
var client = new RegClient();

// 初始化版本号记录文件
let initVersion = function() {
  new Promise((resolve, reject) => {
    if (Object.is(dataType(userMsg.storageConfig), "Object")) {
      resolve(userMsg.storageConfig);
    } else {
      userMsg.storageConfig = {
        name: "setting.json",
        vFiled: "version"
      };
      throw userMsg.storageConfig;
    }
  })
    .then(obj => {
      if (!(obj.name && obj.name != "")) {
        obj.name = "setting.json";
      }
      if (!(obj.vFiled && obj.vFiled != "")) {
        obj.vFiled = "version";
      }
      throw obj;
    })
    .catch(msg => {
      // 生成存储文件
      store2File(
        absPath(`file_storage/${msg.name}`),
        {
          [msg.vFiled]: ""
        },
        {
          type: "json",
          created: true
        }
      );
    });
};

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

// 检测入口
let detectEntry = function() {
  try {
    for (let key in userMsg.loginConfig) {
      let status = detectCore(userMsg.loginConfig[key]);
      if (!status) {
        throw `you may not set up correctly on the file npmUserLogin.js,maybe property userMsg.loginConfig.${key} is empty`;
      }
    }
    /*  for (let key in userMsg.packageConfig) {
      if (Object.is(key, "name") || Object.is(key, "repository")) {
        let status = detectCore(userMsg.packageConfig[key]);
        if (!status) {
          throw `you may not set up correctly on the file npmUserLogin.js,maybe property userMsg.packageConfig.${key} is empty`;
        }
      }
    } */
    let versionType = dataType(userMsg.releaseConfig.version);
    if (
      !Object.is(versionType, "Object") &&
      !Object.is(versionType, "Function")
    ) {
      throw `you may not set up correctly on the file npmUserLogin.js,maybe property userMsg.releaseConfig.version type no Function And Object`;
    }
  } catch (err) {
    console.log(err.red);
    return false;
  }
};

// 计算出默认配置
let computedSetting = function() {
  switch (dataType(userMsg.releaseConfig.version)) {
    case "Object":
      break;
    case "Function":
      let readLastVersion = readFromFile(absPath());
      let version = userMsg.releaseConfig.version();
      break;
  }
  return userMsg;
};

// main
(function() {
  initVersion();

  // console.log(computedUserMsg);
  /*  let isPass = detectEntry();
  if (isPass) {
    // computedSetting();
  } */
})();

/* readFromFile(
  absPath("build/package.json"),
  {
    type: "json"
  },
  (err, msg) => {
    msg.version = "0.0.5";
    store2File(
      absPath("build/package.json"),
      {
        type: "json"
      },
      msg
    );
  }
); */
/* var uri = "https://registry.npmjs.org/npm"
client.get(uri, {
    username: userMsg.loginConfig.username,
    password: userMsg.loginConfig.password,
    email: userMsg.loginConfig.email
}, function(error, data, raw, res) {
    if (error) {
        console.log(error.red);
        return false;
    }
    console.log('npm login success'.green);
    // readFromFile(absPath('build/package.json'), {
    //     type: 'json'
    // }, (err, msg) => {
    //     console.log(err);
    //     console.log(typeof msg);
    //     console.log(msg.version);
    // })

}); */
