let path = require('path');

// generate file address
let resolve = function (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    resolve,
}