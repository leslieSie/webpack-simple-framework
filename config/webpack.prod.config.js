const webpackMerge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const prodConfig = require('./prod.config.js');
const copyWebpackPlugin = require('copy-webpack-plugin');
const process = require('process');
const {
    resolve
} = require('./utils.js');

let folder_exits = fs.existsSync(path.join(__dirname, '../', 'build'));
if (!folder_exits) {
    new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, '../', 'build'), (err) => {
            if (err) {
                console.error(err);
            }
            console.log('新建打包目录');
            resolve(true);
        });
    }).then(data => {
        console.log('then')
    });

}
console.log(process.env.NODE_ENV);
module.exports = {
    entry: ['babel-polyfill', resolve('src/index.js')],
    devtool: prodConfig.devtool,
    mode: 'production',
    output: {
        path: resolve('build'),
        filename: `${prodConfig.mainName}.[hash:7].js`
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
