const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    entry: './index.js',
    mode: 'production',
    output: { //common aunque no lo reemplaze
        path: path.resolve('./', 'dist'),
        filename: 'bundle.js',
        publicPath: './' 
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'index_prod.html'
    }),
    new Dotenv()],
});