let { absPath } = require('./utils.js');

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json', '.es6'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': absPath('src'),
            '_': absPath('view'),
            '_C_': absPath('config')
        }
    }

}