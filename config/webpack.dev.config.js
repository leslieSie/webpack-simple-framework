let webpackMerge = require('webpack-merge');
let baseConfig = require('./webpack.base.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    devtool: 'true',
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin()
    ]
});