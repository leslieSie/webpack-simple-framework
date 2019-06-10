const webpackMerge = require("webpack-merge");
const path = require("path");
const fs = require("fs");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const prodConfig = require("./prod.config.js");
const copyWebpackPlugin = require("copy-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");
const {
    absPath,
    file_exit,
    dir_create
} = require("./utils.js");

let copyFiles = [{
        from: "package.json"
    },
    {
        from: "./src/README.md",
        to: 'README.md'
    },
    {
        from: "LICENSE"
    }
];

let folder_exits = file_exit(path.join(__dirname, "../", "build"));

async function dealBuild() {
    let process = new Promise((resolve, reject) => {
            if (!folder_exits) {
                dir_create(path.join(__dirname, "../", "build"), err => {
                    if (err) {
                        console.error(err);
                    }
                    console.log("新建打包目录");
                });
            }
            resolve(true);
        })
        .then(data => {
            console.log("处理生成文件");
            let isShowSource = prodConfig.showSource || false;
            let isExample = prodConfig.packageExample || false;
            // 检测打包的框架中是否存在README.md文件
            if (!fs.existsSync(absPath('src/README.md'))) {
                throw '打包的框架需要有README.md文件';
            }
            if (isExample) {
                copyFiles.push({
                    from: "view",
                    to: "example"
                });
            }
            if (isShowSource) {
                copyFiles.push({
                    from: "src",
                    to: prodConfig.outputSourceDirectory || "source"
                });
            }
            return true;
        })
        .then(data => {
            return webpackMerge(baseConfig, {
                entry: [absPath(`src/${prodConfig.entryMainFile || "index.js"}`)],
                devtool: false,
                mode: "production",
                output: {
                    path: absPath("build"),
                    filename: `${prodConfig.bundleFile || "main.js"}`,
                    libraryExport: "default",
                    libraryTarget: "commonjs"
                },
                module: {
                    rules: [{
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [{
                            loader: "babel-loader",
                            query: {
                                presets: ["es2015"]
                            }
                        }]
                    }]
                },
                plugins: [new CleanWebpackPlugin(), new copyWebpackPlugin(copyFiles)]
            });
        }).catch(err_msg => {
            console.error(`打包错误：${err_msg}`);
            return 'error';
        });
    let exportData = await process;
    return exportData;
}

module.exports = async function() {
    let config = await dealBuild();
    if (config === 'error') {
        return {}
    }
    return config;
};
