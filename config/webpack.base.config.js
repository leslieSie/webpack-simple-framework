const htmlWebpackPlugin = require('html-webpack-plugin');
let utils = require('./utils.js');
console.log(utils);

module.exports = {
    entry: {
        src: utils.resolve('../src/index.js')
    },
    output: {
        path: utils.resolve('../dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['js', 'vue', 'json', 'html'],
        alias: {
            '_view': utils.resolve('../view'),
            '_src': utils.resolve('../src'),
            '_config': utils.resolve('../config'),
            '_dist': utils.resolve('../dist')
        }
    }

}