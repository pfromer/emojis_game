const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: { //common aunque no lo reemplaze
        path: path.resolve(__dirname, 'bundle'),
        filename: 'bundle.js',
        publicPath: '/public'
    },
    devServer: { //va al dev
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '')
    },
    module: { //commoin
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['stage-0', 'react']
                        }
                    }
                ]
            }
        ]

    },
    resolve: { extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'] }, //common
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

};