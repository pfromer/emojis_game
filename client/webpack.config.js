const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'bundle.js',
        publicPath: '/public'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '')
    },
    module: {
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
    resolve: { extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'] }

};