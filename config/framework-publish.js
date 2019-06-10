const fs = require('fs');
const shell = require('shelljs');
const colors = require('colors');
let bundlePackage = '';
shell.cd('build');
shell.exec('yarn -v', function(code, stdout, stderr) {
    if (code != 0) {
        console.log(stderr.red);
        return false;
    }
    bundlePackage = 'yarn'
    console.log('支持yarn打包!'.magenta);
});

shell.exec(`${bundlePackage} add -g npm-cli-login`, function(code, stdout, stderr) {
    if (code != 0) {
        console.log(stderr.red);
        return false;
    }
    console.log('npm-cli-login 安装完成'.green);
});
