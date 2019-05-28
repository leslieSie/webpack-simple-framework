let webpackMerge = require('webpack-merge');
let baseConfig = require('./webpack.base.config.js');

module.exports = webpackMerge(baseConfig, {
    devtool: true,
    mode: 'development'
});