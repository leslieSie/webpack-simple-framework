const webpackMerge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const prodConfig = require('./prod.config.js');
const copyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const {
    absPath,
    file_exit,
    dir_create
} = require('./utils.js');

let copyFiles = [{
    from: 'package.json'
}];

let folder_exits = file_exit(path.join(__dirname, '../', 'build'));

async function dealBuild() {
    let process = new Promise((resolve, reject) => {
        if (!folder_exits) {
            dir_create(path.join(__dirname, '../', 'build'), (err) => {
                if (err) {
                    console.error(err);
                }
                console.log('新建打包目录');
            });
        }
        resolve(true);
    }).then(data => {
        console.log('处理生成文件')
        console.log(prodConfig);
        let isShowSource = prodConfig.showSource || false;
        let isExample = prodConfig.packageExample || false;

        if (isExample) {
            copyFiles.push({
                from: 'view',
                to: 'example'
            });
        }
        if (isShowSource) {
            copyFiles.push({
                from: 'src',
                to: prodConfig.outputSourceDirectory || 'src'
            });
        }
        return true;
    }).then(data => {
        return webpackMerge(baseConfig, {
            entry: [absPath(`src/${prodConfig.entryMainFile || 'index.js'}`)],
            devtool: false,
            mode: 'production',
            output: {
                path: absPath('build'),
                filename: `${prodConfig.outputMainFile || 'index.js'}`,
                libraryExport: 'default',
                libraryTarget: 'umd'
            },
            module: {
                rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }]
                }, ]
            },
            plugins: [
                new CleanWebpackPlugin(),
                new copyWebpackPlugin(copyFiles)
            ]
        });
    })
    let exportData = await process;
    return exportData;
};

module.exports = async function() {
    let config = await dealBuild();
    console.log(config);
    return config;
}