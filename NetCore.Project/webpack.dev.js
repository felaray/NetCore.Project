"use strict";
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
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
    plugins: [
        new miniCssExtractPlugin({
            filename: './css/[name].css',
            ignoreOrder: true
        }),
        new VueLoaderPlugin.VueLoaderPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: 'images', to: 'images' }
        //     ],
        //     options: {
        //         concurrency: 100
        //     }
        // }),
        // //分析打包
        // new BundleAnalyzerPlugin(
        //     {
        //         rel: 'BundleAnalyzerPlugin',
        //         analyzerMode: 'server', // 'server': 啟動埠服務；'static': 生成 report.html；'disabled': 配合 generateStatsFile 使用；
        //         generateStatsFile: false, // 是否生成stats.json檔案
        //         analyzerHost: '127.0.0.1',
        //         analyzerPort: '8877',
        //         reportFilename: 'report.html',
        //         defaultSizes: 'parsed',
        //         openAnalyzer: false,
        //         statsFilename: 'stats.json',
        //         statsOptions: null,
        //         excludeAssets: null
        //     })
    ],
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery.js',
            'bootstrap': 'bootstrap/dist/js/bootstrap.bundle.js',
            'vue': 'vue/dist/vue.js',
            // 'sweetalert': 'sweetalert/dist/sweetalert.min.js',
            // 'pyramiusjs': 'pyramiusjs/pyramius.js'
        }
    }
});