let { resolve } = require('./utils.js');

module.exports = {
    entry: {
        src: resolve('../src/index.js')
    },
    output: {
        path: resolve('../dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    }

}