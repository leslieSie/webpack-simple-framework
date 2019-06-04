let { resolve } = require('./utils.js');

module.exports = {
    entry: {
        ployfill: 'babel-polyfill',
        index: resolve('view/index.js'),
    },
    output: {
        path: resolve('dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.es6'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '_': resolve('view')
        }
    }

}
