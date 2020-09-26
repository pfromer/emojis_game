const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    output: { //common aunque no lo reemplaze
        path: path.resolve('./', 'dist'),
        filename: 'bundle.js',
        publicPath: './'
    },
});