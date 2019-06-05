let { resolve } = require('./utils.js');

module.exports = {

    resolve: {
        extensions: ['.js', '.vue', '.json', '.es6'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '_': resolve('view')
        }
    }

}
