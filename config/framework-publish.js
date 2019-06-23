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
    if (error) {
        console.log(error.red);
        return false;
    }
    console.log('npm login success'.green);
    readFromFile(absPath('build/package.json'), {
        type: 'json'
    }, (err, msg) => {
        console.log(err);
        console.log(typeof msg);
        console.log(msg);
    })

});
