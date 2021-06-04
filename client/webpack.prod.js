const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: { //common aunque no lo reemplaze
        path: path.resolve('./', 'dist')
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'index.html'
    })],
});