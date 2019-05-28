const htmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

let resolve = function (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    entry: {
        src: resolve('../src/index.js')
    },
    output: {
        path: resolve('../dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extension: ['js', 'vue', 'json', 'html'],
        alias: {
            '_view': resolve('../view'),
            '_src': resolve('../src'),
            '_config': resolve('../config'),
            '_dist': resolve('../dist')
        }
    }

}