module.exports = {
    devtool: 'hidden-source-map',
    showSource: true, // default false
    outputSourceDirectory: 'source', // default value is source, if showSource property set false and this property can't use
    // entryMainFile: '', // default index.js
    // outputMainFile: '', // default index.js
}

/*
  使用说明：
  1. outputMainFile修改的时候，需要将package.json中对应的main进行修改
*/
