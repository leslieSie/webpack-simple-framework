let webpackMerge = require('webpack-merge');
let baseConfig = require('./webpack.base.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const { absPath, global_exclude } = require('./utils.js');
console.log(global_exclude);
module.exports = webpackMerge(baseConfig, {
    entry: {
        ployfill: 'babel-polyfill',
        index: absPath('view/index.js'),
    },
    output: {
        path: absPath('dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].bundle.js'
    },
    mode: 'development',
    devtool: 'eval',
    module: {
        rules: [{
                test: /\.html$/,
                exclude: global_exclude,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.js$/,
                exclude: global_exclude,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [
                    /src/,
                    /view/,
                    path.join(__dirname, '../', 'node_modules/iview/dist/styles/iview.css')
                ]
            },
            {
                test: /\.vue$/,
                exclude: global_exclude,
                use: 'vue-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: parseInt(1024 * 10),
                    name: '[name].[hash:5].[ext]',
                },
            },
            {
                test: /\.less$/,
                exclude: global_exclude,
                use: ['vue-style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, 'less-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'vendor',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new vueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: 'localhost',
        port: 8888,
        open: false,
        compress: true,
    }
});