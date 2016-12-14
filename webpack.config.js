var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:3000',
        app: path.resolve(APP_PATH, 'index.jsx')
    ],
    output: {
        path: BUILD_PATH,
        filename: '[name]-[hash].js',
        publicPath: '/'
    },
    //enable dev source map
    devtool: 'eval-source-map',
    //enable dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    //babel重要的loader在这里
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: APP_PATH,
        }, {
            test: /\.css$/,
            loaders: ['style', 'css', 'postcss']
        }]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'My first react app'
        }),
        // 允许错误不打断程序，,仅开发模式需要
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: function() {
        return [precss, autoprefixer];
    },
}
