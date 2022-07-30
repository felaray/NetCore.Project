"use strict";
const merge = require('webpack-merge');
const common = require('./webpack.common');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
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
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: './css/[name].css'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery.min.js',
            'bootstrap': 'bootstrap/dist/js/bootstrap.bundle.min.js',
            'moment': 'moment/min/moment.min.js',
            'vue': 'vue/dist/vue.min.js',
            'sweetalert': 'sweetalert/dist/sweetalert.min.js',
            'pyramiusjs': 'pyramiusjs/pyramius.js'
        }
    }
});