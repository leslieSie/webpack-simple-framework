let webpackMerge = require('webpack-merge');
let baseConfig = require('./webpack.base.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackDevServer = require("webpack-dev-server");
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    devtool: 'true',
    mode: 'development',
    module: {
        rules: [{
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,

            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: 'test title',
            filename: 'index.html',
            template: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        host: 'localhost',
        port: 8888,
        open: true,
        compress: true,
    }
});