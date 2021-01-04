const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    configureWebpack: {
        resolve: {
          alias: {
            vue$: 'vue/dist/vue.esm-bundler.js'
          }
        },
    },
    devServer:{
        proxy:{
            '/api':{
                target: 'http://localhost:5000'
            }
        }
    }
}