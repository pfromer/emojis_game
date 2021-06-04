const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    devServer: { //va al dev
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '')
    },
    plugins: [
      new Dotenv()
   ]

});