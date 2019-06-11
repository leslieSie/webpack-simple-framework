const fs = require('fs');
const shell = require('shelljs');
const colors = require('colors');
const npmLogin = require('npm-cli-login');
let bundlePackage = '';
shell.cd('build');
npmLogin('XXXXXXXXX','XXXXXXXXX','XXXXXXXXX');
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
