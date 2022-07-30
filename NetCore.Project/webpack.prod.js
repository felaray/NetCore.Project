"use strict";
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader');
const TerserJSPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": false,
                                    "helpers": false,
                                    "regenerator": true
                                }
                            ]
                        ]
                    }
                },
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
    optimization: {
        minimizer: [
            new TerserJSPlugin({})
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: './css/[name].css',
            ignoreOrder: true
        }),
        new VueLoaderPlugin.VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'images', to: 'images' }
            ],
            options: {
                concurrency: 100
            }
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery.min.js',
            'bootstrap': 'bootstrap/dist/js/bootstrap.bundle.min.js',
            'vue': 'vue/dist/vue.min.js',
            // 'sweetalert': 'sweetalert/dist/sweetalert.min.js',
            // 'pyramiusjs': 'pyramiusjs/pyramius.js'
        }
    }
});