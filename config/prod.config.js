module.exports = {
    devtool: 'hidden-source-map',
    showSource: false, // default false
    packageExample: false, // default false
    outputSourceDirectory: 'source', // default value is source, if showSource property set false and this property can't use
    entryMainFile: 'index.js', // default index.js
    bundleFile: 'main.js', // default index.js
}

/*
  使用说明：
  1. bundleFile修改的时候，需要将package.json中对应的main进行修改
  2.outputSourceDirectory 建议不使用src作为值，这样会覆盖默认的打包目录文件
*/