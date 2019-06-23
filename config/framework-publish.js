const fs = require('fs');
const shell = require('shelljs');
const colors = require('colors');
const RegClient = require('npm-registry-client');
const userMsg = require('./npmUserLogin.js');
const { readFromFile, absPath } = require('./utils.js');
var client = new RegClient();

var uri = "https://registry.npmjs.org/npm"
client.get(uri, {
        username: userMsg.username,
        password: userMsg.password,
        email: userMsg.email
    }, function(error, data, raw, res) {
        console.log('npm login success'.green);
        readFromFile(absPath('build/package.json'), {
                type: 'json'
            }, () => {
                conso.e.log(arguments);
            })
            // console.log(res);
            // error is an error if there was a problem.
            // data is the parsed data object
            // raw is the json string
            // res is the response from couch
    })
    /* async function test() {
        // await npmLogin(userMsg.username, userMsg.password, userMsg.email);

    }
    test(); */

// console.log(1);
/* shell.exec('yarn -v', function (code, stdout, stderr) {
  if (code != 0) {
    console.log(stderr.red);
    return false;
  }
  bundlePackage = 'yarn'
  console.log('支持yarn打包!'.magenta);
  console.log(bundlePackage);

});
shell.exec(`npm install npm-cli-login -g`, function (code, stdout, stderr) {
  if (code != 0) {
    console.log(stderr.red);
    return false;
  }
  console.log('npm-cli-login 安装完成'.green);
});
 */
