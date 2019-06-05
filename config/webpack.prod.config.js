const webpackMerge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const {
  resolve
} = require('./utils.js');

let folder_exits = fs.existsSync(path.join(__dirname, '../', 'build'));
if (!folder_exits) {
  fs.mkdir(path.join(__dirname, '../', 'build'), (err) => {
    if (err) {
      console.error(err);
    }
    console.log('新建打包目录')
  });
}

module.exports = {
  entry: ['babel-polyfill', resolve('src/index.js')],
  devtool: 'hidden-source-map',
  output: {
    path: resolve('build'),
    filename: 'test.js'
  },
}
