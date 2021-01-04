const path = require('path');
const  BundleAnalyzerPlugin =   require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BootstrapVueLoader = require('bootstrap-vue-loader')

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer:{
        proxy:{
            '/api':{
                target: 'http://localhost:5000'
            }
        }
    },
    configureWebpack: {
        plugins: [new BundleAnalyzerPlugin(), new BootstrapVueLoader()]
    }
}