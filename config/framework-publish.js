const fs = require('fs');
const shell = require('shelljs');
shell.cd('build');
shell.exec('npm login')