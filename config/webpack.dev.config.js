let webpackMerge = require('webpack-merge');
let baseConfig = require('./webpack.base.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const WebpackDevServer = require("webpack-dev-server");
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');

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
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: 'vue-loader'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['vue-style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, 'less-loader']
            }
        ]
    },
    plugins: [
        new vueLoaderPlugin(),
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