"use strict";
const merge = require('webpack-merge');
const common = require('./webpack.common');
const miniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5 * 1024,
                            publicPath: '../assets',
                            outputPath: './assets',
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: './css/[name].css'
        })
    ],
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery.js',
            'bootstrap': 'bootstrap/dist/js/bootstrap.bundle.js',
            'moment': 'moment/src/moment.js',
            'vue': 'vue/dist/vue.js',
            'sweetalert': 'sweetalert/dist/sweetalert.min.js',
            'pyramiusjs': 'pyramiusjs/pyramius.js'
        }
    }
});