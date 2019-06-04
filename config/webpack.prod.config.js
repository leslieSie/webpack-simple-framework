const webpackMerge = require('webpack-merge');
const path = require('path');
const fs = require('fs');

let folder_exits = fs.existsSync(path.join(__dirname, '../', 'build'));
if (!folder_exits) {
    fs.mkdir(path.join(__dirname, '../', 'build'), (err) => {
        if (err) {
            console.error(err);
        }
        console.log('新建打包目录')
    });
}
