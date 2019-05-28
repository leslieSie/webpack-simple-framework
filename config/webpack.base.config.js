const htmlWebpackPlugin = require('html-webpack-plugin');
let { resolve } = require('./utils.js');


module.exports = {
    entry: {
        src: resolve('../src/index.js')
    },
    output: {
        path: resolve('../dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['js', 'vue', 'json', 'html'],
        alias: {
            '_view': resolve('../view'),
            '_src': resolve('../src'),
            '_config': resolve('../config'),
            '_dist': resolve('../dist')
        }
    }

}