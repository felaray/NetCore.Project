"use strict";
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        login: "./js/Sample.js"
    },
    output: {
        path: path.resolve(process.cwd(), 'wwwroot/dist'),
        filename: "./js/[name].js"
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    minChunks: 5,
                    name: 'vendor'
                }
            }
        }
    }
};